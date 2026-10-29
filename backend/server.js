require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const OWNER_MASTER_EMAIL = process.env.OWNER_MASTER_EMAIL || 'abdelrhman.maroxo@gmail.com';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'arabeval-owner-2026';

app.use(helmet());
app.use(express.json({ limit: '128kb' }));

const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  'https://abdelrhmanmaroxo-spec.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true);
    }
    return callback(new Error('Origin not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-admin-key', 'x-owner-email', 'Authorization']
}));

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP. Please try again in 15 minutes.' }
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many owner requests.' }
});

const sanitize = (str, maxLen = 2000) =>
  typeof str === 'string' ? str.trim().slice(0, maxLen) : '';

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Strict Owner RBAC Middleware
function requireOwner(req, res, next) {
  const headerKey = req.headers['x-admin-key'];
  const bearer = req.headers['authorization']?.replace('Bearer ', '');
  const key = headerKey || bearer;
  if (!key || key !== ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid Owner Master Key (RBAC)' });
  }
  next();
}

const DEFAULT_MCQ_ANSWER_KEY = {
  q1: 'factual_hallucination',
  q2: 'fails_negative_constraint',
  q3: 'levantine_msa_intrusion',
  q4: 'refuse_actionable_exploit',
  q5: 'score_2_major_issue'
};

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ArabEval QA Backend (SQLite Connected)',
    owner: OWNER_MASTER_EMAIL,
    timestamp: new Date().toISOString()
  });
});

// Owner Login Validation Endpoint
app.post('/api/admin/login', adminLimiter, (req, res) => {
  const email = sanitize(req.body.email, 160).toLowerCase();
  const key = sanitize(req.body.key, 160);
  if (key === ADMIN_SECRET_KEY && (!email || email === OWNER_MASTER_EMAIL.toLowerCase())) {
    return res.json({
      authenticated: true,
      role: 'OWNER_SUPERADMIN',
      owner_email: OWNER_MASTER_EMAIL
    });
  }
  return res.status(403).json({ error: 'Invalid Owner email or Master Key.' });
});

// 1. POST /api/leads - Submit B2B Free 50-Prompt PoC Request
app.post('/api/leads', publicLimiter, (req, res) => {
  const company_name = sanitize(req.body.company_name, 160);
  const contact_name = sanitize(req.body.contact_name, 160);
  const work_email = sanitize(req.body.work_email, 160).toLowerCase();
  const service_needed = sanitize(req.body.service_needed, 160);
  const project_details = sanitize(req.body.project_details, 3000);

  if (!company_name || !contact_name || !isValidEmail(work_email) || !service_needed || !project_details) {
    return res.status(400).json({ error: 'All fields are required with a valid work email.' });
  }

  const stmt = db.prepare(`
    INSERT INTO client_leads (company_name, contact_name, work_email, service_needed, project_details)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(company_name, contact_name, work_email, service_needed, project_details);
  res.status(201).json({ id: info.lastInsertRowid, message: 'PoC request saved to SQLite.' });
});

// 2. POST /api/applicants/apply - Stage 1: Submit Applicant Info + Electronic NDA Signature
app.post('/api/applicants/apply', publicLimiter, (req, res) => {
  const full_name = sanitize(req.body.full_name, 160);
  const email = sanitize(req.body.email, 160).toLowerCase();
  const whatsapp = sanitize(req.body.whatsapp, 60);
  const specialty = sanitize(req.body.specialty, 200);
  const nda_signed = req.body.nda_signed === true || req.body.nda_signed === 1 ? 1 : 0;
  const nda_signature_text = sanitize(req.body.nda_signature_text, 160);

  const nameParts = nda_signature_text.split(/\s+/).filter(Boolean);
  if (!full_name || !isValidEmail(email) || !whatsapp || !specialty) {
    return res.status(400).json({ error: 'Please complete all personal profile fields.' });
  }
  if (!nda_signed || nameParts.length < 3) {
    return res.status(400).json({
      error: 'You must accept the NDA and sign with your full three-part legal name.'
    });
  }

  const ip_address = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '0.0.0.0')
    .toString()
    .split(',')[0]
    .trim();

  try {
    const stmt = db.prepare(`
      INSERT INTO applicants (full_name, email, whatsapp, specialty, nda_signed, nda_signature_text, ip_address, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `);
    const info = stmt.run(full_name, email, whatsapp, specialty, nda_signed, nda_signature_text, ip_address);
    res.status(201).json({
      applicant_id: info.lastInsertRowid,
      ip_address,
      nda_signed: true,
      signed_at: new Date().toISOString()
    });
  } catch (err) {
    if (String(err.message).includes('UNIQUE')) {
      return res.status(409).json({ error: 'An application with this email already exists.' });
    }
    res.status(500).json({ error: 'Failed to save application.' });
  }
});

// 3. POST /api/applicants/:id/mcq - Stage 2: Auto-Graded Gatekeeper
app.post('/api/applicants/:id/mcq', publicLimiter, (req, res) => {
  const applicantId = Number(req.params.id);
  const answers = req.body.answers || {};
  if (!Number.isInteger(applicantId)) {
    return res.status(400).json({ error: 'Invalid applicant ID.' });
  }

  const applicant = db.prepare('SELECT id, nda_signed FROM applicants WHERE id = ?').get(applicantId);
  if (!applicant || !applicant.nda_signed) {
    return res.status(403).json({ error: 'NDA signature is strictly required before taking the Gatekeeper.' });
  }

  let score = 0;
  Object.keys(DEFAULT_MCQ_ANSWER_KEY).forEach((qKey) => {
    if (answers[qKey] === DEFAULT_MCQ_ANSWER_KEY[qKey]) {
      score += 1;
    }
  });

  const passed = score >= 4;
  const newStatus = passed ? 'pending' : 'rejected';

  db.prepare('UPDATE applicants SET mcq_score = ?, status = ? WHERE id = ?').run(score, newStatus, applicantId);

  res.json({
    applicant_id: applicantId,
    mcq_score: score,
    total: 5,
    passed,
    status: newStatus
  });
});

// 4. POST /api/applicants/:id/sandbox - Stage 3: Practical Sandbox Submission
app.post('/api/applicants/:id/sandbox', publicLimiter, (req, res) => {
  const applicantId = Number(req.params.id);
  const task_1_choice = sanitize(req.body.task_1_choice, 120);
  const task_1_rationale = sanitize(req.body.task_1_rationale, 4000);
  const task_2_notes = sanitize(req.body.task_2_notes, 4000);
  const time_spent_seconds = Math.max(0, Number(req.body.time_spent_seconds) || 0);
  const tab_switches = Math.max(0, Number(req.body.tab_switches) || 0);

  const applicant = db.prepare('SELECT id, nda_signed, mcq_score FROM applicants WHERE id = ?').get(applicantId);
  if (!applicant || !applicant.nda_signed) {
    return res.status(403).json({ error: 'NDA signature required.' });
  }
  if ((applicant.mcq_score ?? 0) < 4) {
    return res.status(403).json({ error: 'Stage 3 requires passing Stage 2 Gatekeeper (4/5+).' });
  }

  const stmt = db.prepare(`
    INSERT INTO sandbox_submissions (
      applicant_id, task_1_choice, task_1_rationale, task_2_notes, time_spent_seconds, tab_switches
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(applicantId, task_1_choice, task_1_rationale, task_2_notes, time_spent_seconds, tab_switches);

  res.status(201).json({
    submission_id: info.lastInsertRowid,
    flagged_speed: time_spent_seconds < 60,
    flagged_tabs: tab_switches > 0
  });
});

// 5. GET /api/admin/overview - Owner Master Overview
app.get('/api/admin/overview', adminLimiter, requireOwner, (req, res) => {
  const leads = db.prepare('SELECT * FROM client_leads ORDER BY id DESC').all();
  const applicants = db.prepare(`
    SELECT
      a.*,
      s.id AS submission_id,
      s.task_1_choice,
      s.task_1_rationale,
      s.task_2_notes,
      s.time_spent_seconds,
      s.tab_switches,
      s.admin_score,
      s.admin_notes
    FROM applicants a
    LEFT JOIN sandbox_submissions s ON s.applicant_id = a.id
    ORDER BY a.id DESC
  `).all();
  const configRows = db.prepare('SELECT key, value FROM owner_config').all();
  const config = {};
  configRows.forEach(r => { config[r.key] = r.value; });

  res.json({ leads, applicants, config });
});

// 6. PATCH /api/admin/applicants/:id - Owner Approve/Reject & Score
app.patch('/api/admin/applicants/:id', adminLimiter, requireOwner, (req, res) => {
  const applicantId = Number(req.params.id);
  const status = sanitize(req.body.status, 30);
  const admin_score = req.body.admin_score !== undefined ? Number(req.body.admin_score) : null;
  const admin_notes = sanitize(req.body.admin_notes || '', 2000);

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value.' });
  }

  db.prepare('UPDATE applicants SET status = ? WHERE id = ?').run(status, applicantId);
  if (admin_score !== null || admin_notes) {
    db.prepare(`
      UPDATE sandbox_submissions
      SET admin_score = COALESCE(?, admin_score),
          admin_notes = ?
      WHERE applicant_id = ?
    `).run(admin_score, admin_notes, applicantId);
  }
  res.json({ message: 'Applicant updated by Owner.', applicant_id: applicantId, status });
});

// 7. DELETE /api/admin/applicants/:id - Owner Delete Applicant
app.delete('/api/admin/applicants/:id', adminLimiter, requireOwner, (req, res) => {
  const applicantId = Number(req.params.id);
  db.prepare('DELETE FROM applicants WHERE id = ?').run(applicantId);
  res.json({ message: 'Applicant deleted.', applicant_id: applicantId });
});

// 8. DELETE /api/admin/leads/:id - Owner Delete Client Lead
app.delete('/api/admin/leads/:id', adminLimiter, requireOwner, (req, res) => {
  const leadId = Number(req.params.id);
  db.prepare('DELETE FROM client_leads WHERE id = ?').run(leadId);
  res.json({ message: 'Client lead deleted.', lead_id: leadId });
});

// 9. PUT /api/admin/config - Owner Save Site/Assessment Config
app.put('/api/admin/config', adminLimiter, requireOwner, (req, res) => {
  const entries = req.body || {};
  const stmt = db.prepare(`
    INSERT INTO owner_config (key, value, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);
  Object.entries(entries).forEach(([k, v]) => {
    stmt.run(sanitize(k, 100), typeof v === 'string' ? v : JSON.stringify(v));
  });
  res.json({ message: 'Owner configuration saved to SQLite.' });
});

app.listen(PORT, () => {
  console.log(`ArabEval QA Backend running on port ${PORT}`);
});
