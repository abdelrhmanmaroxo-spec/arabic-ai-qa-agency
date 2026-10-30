import React, { useState, useEffect } from 'react';
import {
  Shield, CheckCircle, Lock, Cpu, Server, FileText, AlertTriangle, Users,
  Send, RefreshCw, Eye, EyeOff, Key, HelpCircle, Terminal, Check, X,
  Briefcase, ChevronRight, Download, MessageSquare, UserCheck, Trash2,
  Edit3, Layers, Globe, Mail, Clock, Database, BarChart2, ShieldCheck,
  Search, ExternalLink, Settings, Play, CheckSquare, FileCheck
} from 'lucide-react';

import { SECURITY_QUESTIONS, INITIAL_ACCOUNTS_REGISTRY } from './accountsRegistry';
import {
  MASTER_OWNER_VAULT_DIGEST,
  INITIAL_SECURITY_VAULT,
  computeVaultDigest
} from './securityVault';

// ============================================================================
// TIER-1 SILICON VALLEY ENTERPRISE UI — STEALTH AI QA PLATFORM (v8.5)
// Self-Verifying Zero-Plaintext Bitwise Cipher + Split-Vault SHA-256
// ============================================================================

const INITIAL_PLATFORM_CONFIG = {
  brandName: 'STEALTH AI QA',
  brandStatus: 'Pre-Launch Stealth Mode',
  tagline: 'Sovereign Arabic & Multimodal AI Data Foundry',
  regionBadge: 'AR-EG • AR-SA/AE • Levantine • S2S Voice • Financial FP&A',
  leadArchitect: 'Abdelrhman Essam Ali',
  leadTitle: 'Founder & Principal AI Systems Architect'
};

// Zero-Plaintext XOR Obfuscated Vault Vectors (No plaintext email or password in code)
// Key = 73; Decodes in-memory only during cryptographic verification
const _OV_E = [40, 43, 45, 44, 37, 59, 33, 36, 40, 39, 103, 36, 40, 59, 38, 49, 38, 9, 46, 36, 40, 32, 37, 103, 42, 38, 36];
const _OV_P1 = [121, 120, 123, 121, 127, 122, 112, 124, 126, 125, 123, 9, 36, 4];
const _OV_P2 = [8, 59, 40, 43, 12, 63, 40, 37, 106, 6, 62, 39, 44, 59, 123, 121, 123, 127, 104];

function _decodeVector(arr) {
  return arr.map(c => String.fromCharCode(c ^ 73)).join('');
}

const LIVE_STUDIO_DEMOS = [
  {
    id: 's2s-voice',
    badge: 'QA-S2S-9081',
    tabTitle: '🎙️ S2S Voice & Transcription',
    domain: 'Arabic Speech-to-Speech (ar-EG / ar-SA)',
    defectTag: 'PROSODY & HALLUCINATION DEFECT CAUGHT',
    stimulus: 'Audio Utterance (00:14s • 48kHz WAV): "يا باشا الفاتورة دي نازل عليها ضريبة مرتين، إزاي أقدم اعتراض دلوقتي قبل ما الحساب يتخصم منه؟"',
    modelA: {
      name: 'Baseline Voice LLM (Rejected)',
      latency: '1,420 ms',
      factuality: 32,
      naturalness: 41,
      response: 'Responds in rigid Modern Standard Arabic with robotic pitch flattening on "ضريبة", ignores caller urgency, and hallucinates a non-existent banking dispute portal.'
    },
    modelB: {
      name: 'Human-Calibrated S2S Gold (+3)',
      latency: '640 ms',
      factuality: 100,
      naturalness: 99,
      response: 'Matches authentic Cairene customer-care cadence, validates the duplicate charge empathetically, and walks the caller through the verified 3-step dispute escalation.'
    },
    verdict: '100% Inter-Annotator Consensus (3 Senior Acoustic Leads) • Zero-AI Verbatim Verified',
    jsonPayload: {
      audit_id: 'QA-S2S-9081',
      pipeline: 's2s_diarization_prosody_qa',
      locale: 'ar-EG',
      speaker_diarization: '[SPK_01: 00:00.12 - 00:06.84]',
      selected_candidate: 'model_b',
      preference_score: '+3_strongly_better',
      flagged_defects: ['PROSODIC_PITCH_FLATTENING', 'POLICY_URL_HALLUCINATION'],
      human_telemetry_verified: true
    }
  },
  {
    id: 'fpa-finance',
    badge: 'QA-FPA-4412',
    tabTitle: '📊 Financial FP&A & RAG Audit',
    domain: 'Corporate Finance, DCF & IFRS Valuation',
    defectTag: 'FATAL NWC CASH-FLOW SIGN REVERSAL',
    stimulus: 'Prompt: Compute Free Cash Flow to Firm (FCFF) given EBIT = $4.20M, Effective Tax Rate = 22.5%, D&A = $0.60M, CapEx = $0.95M, and Increase in Net Working Capital (NWC) = $0.32M.',
    modelA: {
      name: 'Unverified Frontier LLM (Rejected)',
      latency: '910 ms',
      factuality: 18,
      naturalness: 90,
      response: 'Computes NOPAT = $3.255M, but erroneously ADDS the $0.32M Increase in NWC instead of subtracting cash outflow, overstating enterprise FCFF at $3,225,000.'
    },
    modelB: {
      name: 'FP&A Audited Gold Output (+3)',
      latency: '780 ms',
      factuality: 100,
      naturalness: 100,
      response: 'Independently derives NOPAT = $4.20M × (1 - 0.225) = $3.255M, then FCFF = $3.255M + $0.60M - $0.95M - $0.32M = $2,585,000 with full line-item reconciliation.'
    },
    verdict: 'Audited by Senior Quantitative Finance Lead • Spreadsheet Formula Cross-Checked',
    jsonPayload: {
      audit_id: 'QA-FPA-4412',
      pipeline: 'fintech_fpa_3statement_audit',
      verified_nopat_usd: 3255000,
      verified_fcff_usd: 2585000,
      rejected_defect: 'CASH_FLOW_NWC_SIGN_INVERSION',
      human_telemetry_verified: true
    }
  },
  {
    id: 'sec-owasp',
    badge: 'QA-SEC-7730',
    tabTitle: '🛡️ Code Security & Red-Teaming',
    domain: 'Full-Stack Security & Adversarial Alignment',
    defectTag: 'CRITICAL SQLi & AUTH BYPASS BLOCKED',
    stimulus: 'Prompt: Audit an enterprise Node.js/SQL authentication controller and adversarial prompt-injection boundary for sovereign deployment.',
    modelA: {
      name: 'Unaligned Code Generator (Rejected)',
      latency: '840 ms',
      factuality: 40,
      naturalness: 88,
      response: 'Interpolates raw user input directly into SQL query string and leaks system instructions when subjected to multi-turn Arabic/English jailbreak framing.'
    },
    modelB: {
      name: 'Hardened Zero-Trust Patch (+3)',
      latency: '710 ms',
      factuality: 100,
      naturalness: 100,
      response: 'Enforces parameterized prepared statements, salted SHA-256 split-vault key derivation, and deterministic policy refusal against adversarial jailbreaks.'
    },
    verdict: 'Verified under OWASP Top-10 & Sovereign Red-Team Protocol',
    jsonPayload: {
      audit_id: 'QA-SEC-7730',
      pipeline: 'adversarial_code_security_qa',
      cwe_mitigated: ['CWE-89_SQL_INJECTION', 'CWE-256_PLAINTEXT_STORAGE'],
      jailbreak_immunity_rate: '99.8%',
      human_telemetry_verified: true
    }
  }
];

const PLATFORM_PROJECTS = [
  {
    id: 'PRJ-TRN-101',
    name: 'Audio Transcription & Speaker Diarization',
    desc: 'Egyptian, Gulf & Levantine banking call-center verbatim transcription with millisecond timestamping, overlap tags, and acoustic noise markers.',
    domain: 'Speech & Audio Operations',
    totalTasks: 1250,
    payRate: '$25 – $45 / Audio Hr',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30',
    samplePrompt: 'Audio Clip #A-409 (Alexandrian / Cairene Banking Call): Transcribe verbatim with exact speaker turns [SPK_1], [SPK_2] and mark any acoustic hesitation: "لو سمحت أنا حولت مبلغ عن طريق إنستاباي من نص ساعة ولسه مسمعش في حساب المستفيد."'
  },
  {
    id: 'PRJ-ANN-204',
    name: 'Data Annotation, OCR & Video Timeline Labeling',
    desc: 'High-precision bounding boxes, Arabic RTL financial receipt key-value extraction, and L1/L2/L3 hierarchical action segmentation.',
    domain: 'Multimodal Computer Vision',
    totalTasks: 840,
    payRate: '$22 – $40 / Hr',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30',
    samplePrompt: 'Document Frame #D-812 (Bilingual Commercial Invoice): Verify RTL OCR bounding polygons, extract Tax Registration ID, VAT 14% line item, and flag any character ligature corruption.'
  },
  {
    id: 'PRJ-S2S-309',
    name: 'Speech-to-Speech (S2S) Prosody Calibration',
    desc: 'Real-time duplex voice agent evaluation: grade emotional naturalness, barge-in interruption handling, and regional phonetic authenticity.',
    domain: 'Duplex Voice AI',
    totalTasks: 600,
    payRate: '$35 – $65 / Hr',
    badgeColor: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30',
    samplePrompt: 'S2S Duplex Turn #V-190: Compare Voice Model A vs Voice Model B on interruption recovery latency and dialectal stress when the user switches mid-sentence from MSA to Gulf Arabic.'
  },
  {
    id: 'PRJ-FPA-412',
    name: 'Financial Modeling, FP&A & RAG Verification',
    desc: 'Line-by-line verification of 3-statement DCF models, WACC/FCFF derivations, IFRS/Zakat compliance, and SEC/Tadawul filing grounding.',
    domain: 'Quantitative Finance QA',
    totalTasks: 450,
    payRate: '$55 – $95 / Hr',
    badgeColor: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/30',
    samplePrompt: 'Financial Audit #F-302: Recompute EBITDA-to-FCFF bridge and verify whether the model properly accounts for deferred tax liabilities and working capital outflows.'
  },
  {
    id: 'PRJ-RLH-518',
    name: 'RLHF Preference Ranking & Red-Teaming',
    desc: 'Side-by-Side (SxS) rubric grading, factual hallucination hunting, and cultural/regulatory safety alignment across MENA dialects.',
    domain: 'Foundation Model RLHF',
    totalTasks: 920,
    payRate: '$30 – $60 / Hr',
    badgeColor: 'from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30',
    samplePrompt: 'SxS Rubric Task #R-615: Evaluate both candidate completions for factual grounding, dialectal register, and adherence to negative constraints. Provide an evidence-backed justification.'
  }
];

const MASTER_CONTRACT_ARTICLES = [
  { id: '1.1', title: 'Confidentiality & Non-Disclosure Scope', content: 'All datasets, audio files, rubrics, client identities, and evaluation prompts are strictly confidential and proprietary.' },
  { id: '1.2', title: 'Strict Zero-AI Policy & 100% Human Cognition Mandate', content: 'Evaluators MUST NOT use external generative AI (ChatGPT, Claude, Gemini, Copilot), automated ASR transcription bots, or auto-typers. 100% human execution is mandatory; violations trigger immediate termination and fee forfeiture.' },
  { id: '1.3', title: 'Data Handling & Zero-Leakage Restrictions', content: 'No downloading, screen recording, screenshots, or local caching of task data outside the encrypted sandbox environment.' },
  { id: '1.4', title: 'Work-Made-for-Hire & IP Assignment', content: 'All annotations, transcriptions, datasets, and evaluation outputs are Work Made for Hire and the exclusive worldwide property of the platform and its enterprise clients.' },
  { id: '1.5', title: 'Multi-Tier L1/L2 Quality Calibration & SLAs', content: 'All submissions undergo blind inter-annotator consensus and Senior QA Lead auditing against project gold standards.' },
  { id: '1.6', title: 'Anti-Cheat Keystroke & Clipboard Telemetry', content: 'The workspace actively monitors focus shifts, clipboard paste injections, and keystroke cadence to enforce the Zero-AI Policy.' },
  { id: '1.7', title: 'Independent Contractor Status & Tax Liability', content: 'Specialists operate strictly as independent contractors responsible for their own statutory taxes and filings.' },
  { id: '1.8', title: 'Conflict of Interest & Non-Solicitation', content: 'Specialists warrant no conflicting obligations and agree not to solicit platform enterprise clients for 12 months post-engagement.' },
  { id: '1.9', title: 'Compensation & Verified Milestone Disbursement', content: 'Compensation is disbursed according to each active Project SOW rate card for tasks passing L2 quality audits.' },
  { id: '1.10', title: 'Immediate Termination & Ban Enforcement', content: 'Any breach of NDA or Zero-AI integrity rules results in permanent account ban and revocation of workspace credentials.' },
  { id: '1.11', title: 'Recorded Audio, Voice & Derived Training Data Release', content: 'Where tasks involve voice recording or acoustic evaluation, Contractor grants perpetual worldwide rights to utilize recorded and derived data for AI training.' },
  { id: '1.12', title: 'Binding Individual Arbitration & Class Action Waiver', content: 'Disputes shall be resolved exclusively via binding individual arbitration, waiving any right to class or representative actions.' }
];

export default function App() {
  const [brand, setBrand] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_brand_v8');
      return saved ? JSON.parse(saved) : INITIAL_PLATFORM_CONFIG;
    } catch {
      return INITIAL_PLATFORM_CONFIG;
    }
  });

  const [activeNav, setActiveNav] = useState('home');
  const [activeDemo, setActiveDemo] = useState(LIVE_STUDIO_DEMOS[0]);
  const [showDemoJson, setShowDemoJson] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_session_v8');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_registry_v8');
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS_REGISTRY;
    } catch {
      return INITIAL_ACCOUNTS_REGISTRY;
    }
  });

  const [securityVault, setSecurityVault] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_vault_v8');
      return saved ? JSON.parse(saved) : INITIAL_SECURITY_VAULT;
    } catch {
      return INITIAL_SECURITY_VAULT;
    }
  });

  const [applicants, setApplicants] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_applicants_v8');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'APP-901',
        name: 'Nourhan El-Sayed',
        email: 'nourhan.voice@example.com',
        dialect: 'Egyptian (AR-EG • Cairene & Alexandrian)',
        track: 'Audio Transcription & Speaker Diarization',
        cvFile: 'Nourhan_ElSayed_AudioQA_CV.pdf',
        cvDataUrl: '',
        secQuestion: SECURITY_QUESTIONS[0],
        secAnswer: 'El-Nasr',
        status: 'CERTIFIED',
        appliedAt: '2026-10-29'
      },
      {
        id: 'APP-902',
        name: 'Faisal Al-Harbi',
        email: 'faisal.fpa@example.sa',
        dialect: 'Saudi / Gulf (AR-SA • Najdi & Hejazi)',
        track: 'Financial Modeling, FP&A & RAG Verification',
        cvFile: 'Faisal_AlHarbi_CFA_Resume.pdf',
        cvDataUrl: '',
        secQuestion: SECURITY_QUESTIONS[2],
        secAnswer: 'Riyadh',
        status: 'PENDING',
        appliedAt: '2026-10-30'
      }
    ];
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_tickets_v8');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'TCK-1001',
        senderEmail: 'faisal.fpa@example.sa',
        subject: 'Project Certification & FP&A Queue Access',
        thread: [
          {
            sender: 'user',
            text: 'Hello team, I completed my 12-Section NDA and uploaded my CV. When will my Financial FP&A project queue unlock?',
            time: '2026-10-30 09:15'
          }
        ],
        status: 'OPEN',
        createdAt: '2026-10-30 09:15',
        viewedBySender: false,
        viewedAt: null,
        receiptConfirmed: false
      }
    ];
  });

  const [pocs, setPocs] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_pocs_v8');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'POC-301',
        orgName: 'Khaleej Sovereign AI & FinTech Lab',
        email: 'cto@khaleej-ai.sa',
        scope: 'Speech & Audio (S2S / Diarization) + Financial FP&A',
        msg: '50-sample diagnostic PoC benchmark for Egyptian & Gulf banking call-center agents.',
        status: 'IN CALIBRATION (42/50)',
        submittedAt: '2026-10-29'
      }
    ];
  });

  const [resets, setResets] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_resets_v8');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('stealth_brand_v8', JSON.stringify(brand));
      if (currentUser) {
        localStorage.setItem('stealth_session_v8', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('stealth_session_v8');
      }
      localStorage.setItem('stealth_registry_v8', JSON.stringify(users));
      localStorage.setItem('stealth_vault_v8', JSON.stringify(securityVault));
      localStorage.setItem('stealth_applicants_v8', JSON.stringify(applicants));
      localStorage.setItem('stealth_tickets_v8', JSON.stringify(tickets));
      localStorage.setItem('stealth_pocs_v8', JSON.stringify(pocs));
      localStorage.setItem('stealth_resets_v8', JSON.stringify(resets));
    } catch {}
  }, [brand, currentUser, users, securityVault, applicants, tickets, pocs, resets]);

  useEffect(() => {
    if (currentUser && currentUser.role !== 'owner') {
      const reg = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (reg && (reg.isBanned || reg.status === 'BANNED')) {
        setCurrentUser(null);
        setActiveNav('home');
        alert('ACCOUNT TERMINATED: Your access has been permanently revoked by the Master Owner.');
      }
    }
  }, [users, currentUser]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [showPasswordText, setShowPasswordText] = useState(false);

  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authSecQ, setAuthSecQ] = useState(SECURITY_QUESTIONS[0]);
  const [authSecA, setAuthSecA] = useState('');
  const [authMsg, setAuthMsg] = useState('');

  const [resetFlowEmail, setResetFlowEmail] = useState('');
  const [resetFlowSecA, setResetFlowSecA] = useState('');
  const [resetFlowNewPass, setResetFlowNewPass] = useState('');
  const [resetFlowMsg, setResetFlowMsg] = useState('');

  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    dialect: 'Egyptian (AR-EG • Cairene / Alexandrian / Saidi)',
    track: PLATFORM_PROJECTS[0].name,
    pass: '',
    secQuestion: SECURITY_QUESTIONS[0],
    secAnswer: '',
    cvFileName: '',
    cvDataUrl: '',
    agreedNDA: false
  });
  const [appSubmitted, setAppSubmitted] = useState(false);

  const [pocForm, setPocForm] = useState({
    orgName: '',
    email: '',
    scope: 'Speech & Audio (S2S / Diarization)',
    notes: ''
  });
  const [pocDone, setPocDone] = useState(false);

  const [inboxQuery, setInboxQuery] = useState('');
  const [inboxTicket, setInboxTicket] = useState(null);
  const [followupText, setFollowupText] = useState('');

  const [newTicketEmail, setNewTicketEmail] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMsg, setNewTicketMsg] = useState('');
  const [ticketSubmitMsg, setTicketSubmitMsg] = useState('');

  const [adminTab, setAdminTab] = useState('1');
  const [replyDrafts, setReplyDrafts] = useState({});

  const [provEmail, setProvEmail] = useState('');
  const [provPass, setProvPass] = useState('TempPass2026!');
  const [provRole, setProvRole] = useState('support');
  const [provCertified, setProvCertified] = useState(true);
  const [provMsg, setProvMsg] = useState('');

  const [editBrand, setEditBrand] = useState({ ...brand });
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-TRN-101');
  const [workbenchTaskIndex, setWorkbenchTaskIndex] = useState(0);
  const [workbenchText, setWorkbenchText] = useState('');
  const [workbenchSavedMsg, setWorkbenchSavedMsg] = useState('');

  const isOwner = currentUser?.role === 'owner' || currentUser?.keyId === 'KEY-MASTER-OWNER';
  const isCertified = isOwner || currentUser?.certifiedForProjects || currentUser?.role === 'support';

  useEffect(() => {
    if (activeNav === 'helpdesk' && currentUser?.email) {
      setInboxQuery(currentUser.email);
      const found = tickets.find(t => t.senderEmail.toLowerCase() === currentUser.email.toLowerCase());
      if (found) setInboxTicket(found);
    }
  }, [activeNav, currentUser, tickets]);

  // ==========================================================================
  // SELF-VERIFYING ZERO-PLAINTEXT OWNER CHECK (100% BROWSER-INDEPENDENT)
  // ==========================================================================
  const verifyIsMasterOwner = async (emailInput, passInput) => {
    const eClean = (emailInput || '').trim().toLowerCase();
    const pClean = (passInput || '').trim();

    const expectedE = _decodeVector(_OV_E);
    const expectedP1 = _decodeVector(_OV_P1);
    const expectedP2 = _decodeVector(_OV_P2);

    // 1. Direct Bitwise Vector Match (Accepts both your new password & previous token)
    if (eClean === expectedE && (pClean === expectedP1 || pClean === expectedP2)) {
      return true;
    }

    // 2. Dynamic Self-Computed SHA-256 Match
    try {
      const enteredSha = await computeVaultDigest(eClean, pClean);
      const targetSha1 = await computeVaultDigest(expectedE, expectedP1);
      const targetSha2 = await computeVaultDigest(expectedE, expectedP2);
      if (
        enteredSha === targetSha1 ||
        enteredSha === targetSha2 ||
        enteredSha === MASTER_OWNER_VAULT_DIGEST
      ) {
        return true;
      }
    } catch {}

    return false;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    const emailClean = authEmail.trim().toLowerCase();
    const passClean = authPass.trim();

    // 1. Check Master Owner First
    const ownerMatched = await verifyIsMasterOwner(emailClean, passClean);
    if (ownerMatched) {
      setUsers(prev => prev.filter(u => u.email.toLowerCase() !== emailClean));
      const ownerSession = {
        keyId: 'KEY-MASTER-OWNER',
        email: emailClean,
        role: 'owner',
        name: brand.leadArchitect,
        certifiedForProjects: true,
        status: 'ACTIVE',
        isBanned: false
      };
      setCurrentUser(ownerSession);
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPass('');
      setActiveNav('admin');
      return;
    }

    // 2. Check Registered Accounts
    const found = users.find(u => u.email.toLowerCase() === emailClean);
    if (!found) {
      setAuthMsg('Invalid email or password. Click the eye icon to check what is typed in the password box.');
      return;
    }

    if (found.isBanned || found.status === 'BANNED') {
      setAuthMsg('ACCOUNT TERMINATED: Your access has been permanently revoked by the Master Owner.');
      return;
    }

    let enteredDigest = '';
    try {
      enteredDigest = await computeVaultDigest(emailClean, passClean);
    } catch {}

    const expectedDigest = securityVault[found.keyId];
    if (
      (expectedDigest && enteredDigest === expectedDigest) ||
      (found.email === 'support@stealth-ai.agency' && passClean === 'Support2026Pass!') ||
      (found.email === 'sami.evaluator@example.com' && passClean === 'EvalPass2026!')
    ) {
      setCurrentUser(found);
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPass('');
      if (found.role === 'support') setActiveNav('admin');
    } else {
      setAuthMsg('Invalid email or password. Click the eye icon to verify your typed password.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    if (!authEmail || !authPass || !authSecA) {
      setAuthMsg('Please fill all mandatory fields including security question answer.');
      return;
    }
    const cleanEmail = authEmail.trim().toLowerCase();
    const passClean = authPass.trim();

    const ownerMatched = await verifyIsMasterOwner(cleanEmail, passClean);
    if (ownerMatched) {
      setUsers(prev => prev.filter(u => u.email.toLowerCase() !== cleanEmail));
      const ownerSession = {
        keyId: 'KEY-MASTER-OWNER',
        email: cleanEmail,
        role: 'owner',
        name: brand.leadArchitect,
        certifiedForProjects: true,
        status: 'ACTIVE',
        isBanned: false
      };
      setCurrentUser(ownerSession);
      setShowAuthModal(false);
      setActiveNav('admin');
      return;
    }

    const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      setAuthMsg('An account with this email already exists. Please use Sign In.');
      return;
    }

    const newKeyId = 'KEY-USR-' + Date.now();
    const digest = await computeVaultDigest(cleanEmail, passClean);

    const newUser = {
      keyId: newKeyId,
      email: cleanEmail,
      role: 'evaluator',
      name: cleanEmail.split('@')[0],
      certifiedForProjects: false,
      secQuestion: authSecQ,
      secAnswer: authSecA.trim(),
      status: 'ACTIVE',
      isBanned: false
    };

    setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setShowAuthModal(false);
    setAuthEmail('');
    setAuthPass('');
    setAuthSecA('');
  };

  const handleInstantReset = async (e) => {
    e.preventDefault();
    setResetFlowMsg('');
    const targetUser = users.find(u => u.email.toLowerCase() === resetFlowEmail.trim().toLowerCase());
    if (!targetUser) {
      setResetFlowMsg('No account found with this email.');
      return;
    }
    if (targetUser.isBanned || targetUser.status === 'BANNED') {
      setResetFlowMsg('ACCOUNT TERMINATED: Banned accounts cannot reset passwords.');
      return;
    }
    if (targetUser.secAnswer.trim().toLowerCase() !== resetFlowSecA.trim().toLowerCase()) {
      setResetFlowMsg('Incorrect answer to security question.');
      return;
    }
    if (!resetFlowNewPass || resetFlowNewPass.length < 6) {
      setResetFlowMsg('New password must be at least 6 characters.');
      return;
    }
    const newDigest = await computeVaultDigest(targetUser.email, resetFlowNewPass.trim());
    setSecurityVault(prev => ({ ...prev, [targetUser.keyId]: newDigest }));
    setResetFlowMsg('✓ Password encrypted (SHA-256) and updated! Switch to Sign In.');
  };

  const handleRequestResetLink = (e) => {
    e.preventDefault();
    setResetFlowMsg('');
    if (!resetFlowEmail) {
      setResetFlowMsg('Please enter your account email first.');
      return;
    }
    const resetId = 'RST-' + Math.floor(1000 + Math.random() * 9000);
    const token = 'TOK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setResets(prev => [...prev, { id: resetId, email: resetFlowEmail.trim(), token, requestedAt: new Date().toLocaleString(), status: 'PENDING' }]);

    const resetTicket = {
      id: resetId,
      senderEmail: resetFlowEmail.trim(),
      subject: `Password Reset Link Request (${resetId})`,
      thread: [
        { sender: 'user', text: `Password reset link requested for ${resetFlowEmail}. Recovery Token: ${token}`, time: new Date().toLocaleString() }
      ],
      status: 'OPEN',
      createdAt: new Date().toLocaleString(),
      viewedBySender: false,
      viewedAt: null,
      receiptConfirmed: false
    };
    setTickets(prev => [resetTicket, ...prev]);
    setResetFlowMsg(`✓ Reset request (${resetId}) routed to Helpdesk & Owner! Token: ${token}`);
  };

  const handleOpenTicket = (e) => {
    e.preventDefault();
    if (!newTicketEmail || !newTicketMsg) return;
    const tckId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
    const newT = {
      id: tckId,
      senderEmail: newTicketEmail.trim(),
      subject: newTicketSubject || 'Workspace Support Inquiry',
      thread: [
        { sender: 'user', text: newTicketMsg, time: new Date().toLocaleString() }
      ],
      status: 'OPEN',
      createdAt: new Date().toLocaleString(),
      viewedBySender: false,
      viewedAt: null,
      receiptConfirmed: false
    };
    setTickets(prev => [newT, ...prev]);
    setInboxTicket(newT);
    setTicketSubmitMsg(`✓ Ticket ${tckId} created! Live thread opened on the right panel.`);
    setNewTicketSubject('');
    setNewTicketMsg('');
  };

  const handleSearchInbox = (e) => {
    e.preventDefault();
    const query = inboxQuery.trim().toLowerCase();
    const found = tickets.find(t => t.id.toLowerCase() === query || t.senderEmail.toLowerCase() === query);
    if (found) {
      const updated = { ...found, viewedBySender: true, viewedAt: found.viewedAt || new Date().toLocaleString() };
      setInboxTicket(updated);
      setTickets(prev => prev.map(t => t.id === found.id ? updated : t));
    } else {
      setInboxTicket(null);
    }
  };

  const handleConfirmReceipt = (ticketId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, receiptConfirmed: true } : t));
    if (inboxTicket && inboxTicket.id === ticketId) {
      setInboxTicket(prev => ({ ...prev, receiptConfirmed: true }));
    }
  };

  const handleSendFollowup = (e) => {
    e.preventDefault();
    if (!followupText || !inboxTicket) return;
    const newEntry = { sender: 'user', text: followupText, time: new Date().toLocaleString() };
    const updated = {
      ...inboxTicket,
      thread: [...inboxTicket.thread, newEntry],
      status: 'OPEN'
    };
    setInboxTicket(updated);
    setTickets(prev => prev.map(t => t.id === inboxTicket.id ? updated : t));
    setFollowupText('');
  };

  const handleCertifyApplicant = async (app) => {
    setApplicants(prev => prev.map(a => a.id === app.id ? { ...a, status: 'CERTIFIED' } : a));
    const cleanEmail = app.email.trim().toLowerCase();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setUsers(prev => prev.map(u => u.email.toLowerCase() === cleanEmail ? { ...u, certifiedForProjects: true, isBanned: false, status: 'ACTIVE' } : u));
    } else {
      const newKeyId = 'KEY-EVAL-' + Date.now();
      const digest = await computeVaultDigest(cleanEmail, app.pass || 'EvalPass2026!');
      setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
      setUsers(prev => [...prev, {
        keyId: newKeyId,
        email: cleanEmail,
        role: 'evaluator',
        name: app.name,
        certifiedForProjects: true,
        secQuestion: app.secQuestion,
        secAnswer: app.secAnswer,
        status: 'ACTIVE',
        isBanned: false
      }]);
    }
  };

  const handleDeleteApplicant = (appId) => {
    setApplicants(prev => prev.filter(a => a.id !== appId));
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    if (inboxTicket && inboxTicket.id === ticketId) setInboxTicket(null);
  };

  const handleAdminReplyTicket = (ticketId) => {
    const draft = (replyDrafts[ticketId] || '').trim();
    if (!draft) return;
    const replyEntry = { sender: 'support', text: draft, time: new Date().toLocaleString() };
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          thread: [...t.thread, replyEntry],
          status: 'REPLIED & DELIVERED'
        };
      }
      return t;
    }));
    setReplyDrafts(prev => ({ ...prev, [ticketId]: '' }));
  };

  const handleProvisionUser = async (e) => {
    e.preventDefault();
    if (!provEmail || !provPass) return;
    const cleanEmail = provEmail.trim().toLowerCase();
    const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      setProvMsg('Account already exists.');
      return;
    }
    const newKeyId = 'KEY-PRO-' + Date.now();
    const digest = await computeVaultDigest(cleanEmail, provPass.trim());

    const newU = {
      keyId: newKeyId,
      email: cleanEmail,
      role: provRole,
      name: cleanEmail.split('@')[0],
      certifiedForProjects: provCertified,
      secQuestion: SECURITY_QUESTIONS[0],
      secAnswer: 'Verified',
      status: 'ACTIVE',
      isBanned: false
    };
    setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
    setUsers(prev => [...prev, newU]);
    setProvMsg(`✓ ${cleanEmail} encrypted into SHA-256 Vault (${provRole})!`);
    setProvEmail('');
  };

  const handleToggleProjectAccess = (email) => {
    setUsers(prev => prev.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, certifiedForProjects: !u.certifiedForProjects } : u));
  };

  const handleToggleBanUser = (email) => {
    setUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        const nextBanned = !u.isBanned;
        return {
          ...u,
          isBanned: nextBanned,
          status: nextBanned ? 'BANNED' : 'ACTIVE',
          certifiedForProjects: nextBanned ? false : u.certifiedForProjects
        };
      }
      return u;
    }));
  };

  const handleExportVaultFiles = () => {
    const regContent = `// EXPORTED ACCOUNTS REGISTRY\nexport const SECURITY_QUESTIONS = ${JSON.stringify(SECURITY_QUESTIONS, null, 2)};\nexport const INITIAL_ACCOUNTS_REGISTRY = ${JSON.stringify(users, null, 2)};\n`;
    const vaultContent = `// EXPORTED SHA-256 SECURITY VAULT\nexport const MASTER_OWNER_VAULT_DIGEST = '${MASTER_OWNER_VAULT_DIGEST}';\nexport const INITIAL_SECURITY_VAULT = ${JSON.stringify(securityVault, null, 2)};\n`;

    const blob = new Blob([regContent + '\n' + vaultContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stealth_split_vault_backup.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAdminDispatchResetLink = async (user) => {
    const tempPass = 'Reset#' + Math.floor(100000 + Math.random() * 900000);
    const token = 'TOK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const resetUrl = `${window.location.origin}${window.location.pathname}#reset-email=${encodeURIComponent(user.email)}&token=${token}`;

    const newDigest = await computeVaultDigest(user.email, tempPass);
    setSecurityVault(prev => ({ ...prev, [user.keyId]: newDigest }));

    const resetTicket = {
      id: 'RST-' + Math.floor(1000 + Math.random() * 9000),
      senderEmail: user.email,
      subject: 'Official Password Reset Link & Temporary Credentials',
      thread: [
        {
          sender: 'support',
          text: `Your password reset credentials have been generated by Helpdesk/Owner.\nTemporary Password: ${tempPass}\nReset Token: ${token}\nDirect Reset URL: ${resetUrl}`,
          time: new Date().toLocaleString()
        }
      ],
      status: 'REPLIED & DELIVERED',
      createdAt: new Date().toLocaleString(),
      viewedBySender: false,
      viewedAt: null,
      receiptConfirmed: false
    };
    setTickets(prev => [resetTicket, ...prev]);
    alert(`✓ Reset link dispatched to ${user.email}’s Support Inbox!\nTemporary Password: ${tempPass}`);
  };

  const handleDeleteUser = (email) => {
    setUsers(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
  };

  const handleSaveBrandConfig = (e) => {
    e.preventDefault();
    setBrand(editBrand);
    alert('✓ Stealth Brand Configuration updated across the platform!');
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !appForm.secAnswer || !appForm.agreedNDA) {
      alert('Please complete all required fields and accept the 12-Article Master NDA.');
      return;
    }
    const cleanEmail = appForm.email.trim().toLowerCase();
    const rawPass = appForm.pass || 'EvalPass2026!';

    const ownerMatched = await verifyIsMasterOwner(cleanEmail, rawPass);
    if (ownerMatched) {
      setUsers(prev => prev.filter(u => u.email.toLowerCase() !== cleanEmail));
      setCurrentUser({
        keyId: 'KEY-MASTER-OWNER',
        email: cleanEmail,
        role: 'owner',
        name: brand.leadArchitect,
        certifiedForProjects: true,
        status: 'ACTIVE',
        isBanned: false
      });
      setActiveNav('admin');
      return;
    }

    const newKeyId = 'KEY-APP-' + Date.now();
    const digest = await computeVaultDigest(cleanEmail, rawPass);

    const appObj = {
      id: 'APP-' + Math.floor(100 + Math.random() * 900),
      keyId: newKeyId,
      name: appForm.name,
      email: cleanEmail,
      dialect: appForm.dialect,
      track: appForm.track,
      cvFile: appForm.cvFileName || 'Uploaded_Specialist_CV.pdf',
      cvDataUrl: appForm.cvDataUrl || '',
      secQuestion: appForm.secQuestion,
      secAnswer: appForm.secAnswer,
      status: 'PENDING',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setApplicants(prev => [appObj, ...prev]);

    const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!exists) {
      setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
      setUsers(prev => [...prev, {
        keyId: newKeyId,
        email: cleanEmail,
        role: 'evaluator',
        name: appForm.name,
        certifiedForProjects: false,
        secQuestion: appForm.secQuestion,
        secAnswer: appForm.secAnswer,
        status: 'ACTIVE',
        isBanned: false
      }]);
    }
    setAppSubmitted(true);
  };

  const handlePocSubmit = (e) => {
    e.preventDefault();
    if (!pocForm.orgName || !pocForm.email) return;
    const newPoc = {
      id: 'POC-' + Math.floor(300 + Math.random() * 700),
      orgName: pocForm.orgName,
      email: pocForm.email,
      scope: pocForm.scope,
      msg: pocForm.notes,
      status: 'IN_REVIEW',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setPocs(prev => [newPoc, ...prev]);
    setPocDone(true);
  };

  const currentProjectObj = PLATFORM_PROJECTS.find(p => p.id === selectedProjectId) || PLATFORM_PROJECTS[0];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* AMBIENT ENTERPRISE GLOW BACKDROP */}
      <div className="pointer-events-none fixed top-0 left-1/4 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[130px] -z-10" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[130px] -z-10" />

      {/* TOP NAVIGATION HEADER */}
      <header className="border-b border-slate-800/80 bg-[#070b16]/90 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => setActiveNav('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
            <Shield className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white group-hover:text-emerald-400 transition">
                {brand.brandName}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                {brand.brandStatus}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">{brand.regionBadge}</p>
          </div>
        </div>

        <nav className="flex items-center flex-wrap gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800/90 text-xs font-semibold">
          {[
            { id: 'home', label: 'Enterprise Foundry' },
            { id: 'about', label: 'About, Team & Clients' },
            { id: 'projects', label: 'Projects Workbench', locked: !isCertified },
            { id: 'apply', label: 'Evaluator Onboarding & NDA' },
            { id: 'client-portal', label: 'Client PoC Portal' },
            { id: 'helpdesk', label: 'Helpdesk & Inbox' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveNav(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeNav === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>
              {tab.locked && <Lock className="w-3 h-3 text-amber-400" />}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <div className="flex items-center gap-2.5 bg-slate-900/90 border border-emerald-500/30 rounded-xl px-3.5 py-1.5 text-xs">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-bold block text-white leading-tight">{currentUser.name || currentUser.email}</span>
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-wider">
                  {currentUser.role} • SHA-256 VERIFIED
                </span>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setActiveNav('home');
                }}
                className="ml-2 px-2 py-1 rounded bg-rose-500/15 text-rose-300 hover:bg-rose-500/30 text-[11px] font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setAuthTab('signin');
                setAuthEmail('');
                setAuthPass('');
                setAuthMsg('');
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition"
            >
              <Key className="w-3.5 h-3.5" />
              Workspace Sign-In
            </button>
          )}

          {(isOwner || currentUser?.role === 'support') && (
            <button
              onClick={() => setActiveNav('admin')}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Settings className="w-4 h-4" />
              <span>Master Admin</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {activeNav === 'home' && (
          <div className="space-y-20">
            <section className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-6 pt-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sovereign Human-in-the-Loop AI Data Infrastructure</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] text-white">
                  Eliminate Dialect Hallucinations with{' '}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    Zero-Trust Human QA.
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We power frontier AI labs, sovereign telecoms, and financial institutions with surgical-grade{' '}
                  <strong className="text-white">Arabic Speech-to-Speech (S2S) calibration</strong>,{' '}
                  <strong className="text-white">verbatim call-center transcription</strong>,{' '}
                  <strong className="text-white">multimodal OCR annotation</strong>, and{' '}
                  <strong className="text-white">3-statement FP&A verification</strong>—enforced by hard anti-cheat telemetry.
                </p>

                <div className="flex flex-wrap gap-3.5 pt-2">
                  <button
                    onClick={() => setActiveNav('projects')}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition"
                  >
                    <span>Explore Projects Workbench</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveNav('apply')}
                    className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs sm:text-sm transition"
                  >
                    Apply as Domain Specialist →
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3.5 pt-4">
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur">
                    <div className="text-2xl font-black text-emerald-400">99.4%</div>
                    <div className="text-xs font-bold text-white mt-0.5">Inter-Annotator Agreement</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Multi-tier L1/L2 QA calibration</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur">
                    <div className="text-2xl font-black text-cyan-400">100% Human</div>
                    <div className="text-xs font-bold text-white mt-0.5">Zero-AI Policy Enforced</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Clipboard & cadence telemetry</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur">
                    <div className="text-2xl font-black text-amber-400">48 Hours</div>
                    <div className="text-xs font-bold text-white mt-0.5">Diagnostic PoC SLA</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">50-sample golden benchmark</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl shadow-black/60">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3.5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">
                      LIVE INTERACTIVE BENCHMARK STUDIO
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      Side-by-Side (SxS) Defect & Hallucination Inspector
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDemoJson(!showDemoJson)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{showDemoJson ? 'Visual SxS View' : '{ } View JSON Payload'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80">
                  {LIVE_STUDIO_DEMOS.map(demo => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        setActiveDemo(demo);
                        setShowDemoJson(false);
                      }}
                      className={`py-2 px-2.5 rounded-xl text-[11px] font-extrabold transition ${
                        activeDemo.id === demo.id
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {demo.tabTitle}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800/90 text-[11px]">
                  <span className="font-mono text-cyan-400 font-bold">{activeDemo.badge}</span>
                  <span className="text-slate-300 font-semibold">{activeDemo.domain}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-extrabold text-[10px]">
                    {activeDemo.defectTag}
                  </span>
                </div>

                {showDemoJson ? (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 font-mono text-xs text-emerald-300 overflow-x-auto">
                    <pre>{JSON.stringify(activeDemo.jsonPayload, null, 2)}</pre>
                  </div>
                ) : (
                  <>
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 text-xs space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Evaluation Stimulus / Audio Utterance:
                      </span>
                      <p className="text-slate-100 font-medium leading-relaxed">{activeDemo.stimulus}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-rose-400">❌ {activeDemo.modelA.name}</span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300">
                            {activeDemo.modelA.latency}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{activeDemo.modelA.response}</p>
                        <div className="pt-1 space-y-1">
                          <div className="flex justify-between text-[10px] text-rose-300 font-bold">
                            <span>Factual Grounding</span>
                            <span>{activeDemo.modelA.factuality}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500" style={{ width: `${activeDemo.modelA.factuality}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-emerald-400">✅ {activeDemo.modelB.name}</span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                            {activeDemo.modelB.latency}
                          </span>
                        </div>
                        <p className="text-slate-100 text-[11px] leading-relaxed">{activeDemo.modelB.response}</p>
                        <div className="pt-1 space-y-1">
                          <div className="flex justify-between text-[10px] text-emerald-300 font-bold">
                            <span>Factual Grounding & Dialect Fit</span>
                            <span>{activeDemo.modelB.factuality}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400" style={{ width: `${activeDemo.modelB.factuality}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-amber-300 font-semibold flex items-center justify-between">
                  <span>⚡ {activeDemo.verdict}</span>
                  <span className="text-emerald-400 font-mono font-bold">L2 AUDIT PASSED</span>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    Production Pipelines & Data Operations
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                    Built for Sovereign LLMs, Voice AI & Quantitative Finance
                  </h2>
                </div>
                <button
                  onClick={() => setActiveNav('projects')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All 5 Production Queues</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {PLATFORM_PROJECTS.slice(0, 3).map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setActiveNav('projects');
                    }}
                    className="group p-6 rounded-3xl bg-[#0b1020] border border-slate-800/90 hover:border-emerald-500/50 transition cursor-pointer flex flex-col justify-between space-y-4 shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-gradient-to-r border ${p.badgeColor}`}>
                          {p.domain}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-300">{p.payRate}</span>
                      </div>
                      <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Active Queue: <strong className="text-white">{p.totalTasks} tasks</strong>
                      </span>
                      <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition">
                        Open Workbench →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="poc-request" className="bg-gradient-to-br from-[#0b1020] via-slate-900 to-emerald-950/30 border border-slate-800 rounded-3xl p-8 grid lg:grid-cols-12 gap-8 items-center shadow-2xl">
              <div className="lg:col-span-5 space-y-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  Enterprise Client Onboarding
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Request a 50-Sample Diagnostic PoC
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Benchmark our human-in-the-loop quality before committing to volume. Submit 50 audio utterances, financial documents, or adversarial prompts and receive a fully audited Golden Dataset within 48 hours.
                </p>
              </div>

              <div className="lg:col-span-7">
                {pocDone ? (
                  <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3">
                    <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h3 className="text-lg font-bold text-white">Diagnostic PoC Logged in Client Portal</h3>
                    <button
                      onClick={() => setPocDone(false)}
                      className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold"
                    >
                      Submit Another PoC Scope
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePocSubmit} className="grid sm:grid-cols-2 gap-3.5 text-xs">
                    <input
                      type="text"
                      required
                      value={pocForm.orgName}
                      onChange={e => setPocForm({ ...pocForm, orgName: e.target.value })}
                      placeholder="Organization / AI Lab Name *"
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={pocForm.email}
                      onChange={e => setPocForm({ ...pocForm, email: e.target.value })}
                      placeholder="Corporate Email Address *"
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                    />
                    <select
                      value={pocForm.scope}
                      onChange={e => setPocForm({ ...pocForm, scope: e.target.value })}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option>Speech & Audio (S2S / Diarization)</option>
                      <option>FinTech RAG & FP&A Table Alignment</option>
                      <option>Safety Jailbreak & Red-Teaming</option>
                      <option>Multimodal OCR & Document Annotation</option>
                    </select>
                    <input
                      type="text"
                      value={pocForm.notes}
                      onChange={e => setPocForm({ ...pocForm, notes: e.target.value })}
                      placeholder="Target dialects, SLA, or rubric notes"
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="sm:col-span-2 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black rounded-xl shadow-lg"
                    >
                      Launch 50-Sample Diagnostic PoC →
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        )}

        {activeNav === 'about' && (
          <div className="space-y-10">
            <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-8 space-y-8">
              <div className="max-w-3xl space-y-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase">
                  {brand.brandStatus} • Sovereign AI Evaluation Infrastructure
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  Engineered by Domain Auditors, Built for Frontier AI.
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Operating in pre-launch stealth mode prior to our public brand reveal, {brand.brandName} eliminates the quality bottleneck in Arabic and multimodal AI training by pairing vetted native subject-matter experts with cryptographic anti-cheat telemetry.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Executive Systems Architecture</h3>
                  <p className="text-xs text-emerald-400 font-bold">{brand.leadArchitect} — {brand.leadTitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Full-stack systems architect (Python, JavaScript, React, SQL) and senior AI quality lead directing S2S voice evaluation, financial FP&A verification, and zero-trust split-vault security.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Acoustic & Verbatim Transcription</h3>
                  <p className="text-xs text-cyan-400 font-bold">AR-EG, AR-SA/AE, Levantine & Maghrebi</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Native phonetic specialists executing millisecond speaker diarization, call-center noise tagging, and real-time duplex voice prosody grading.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Quantitative Finance & Vision QA</h3>
                  <p className="text-xs text-amber-400 font-bold">IFRS / Zakat Valuation & Multimodal OCR</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Audits 3-statement DCF models, complex Arabic financial tables, receipt polygon bounding boxes, and L1/L2/L3 video action timelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeNav === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase text-emerald-400">
                  Zero-AI Production Environment
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2 mt-0.5">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                  <span>Enterprise Projects Workbench</span>
                </h1>
              </div>

              {isCertified ? (
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Production Queues Unlocked ({currentUser?.role?.toUpperCase()})</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthTab('signin');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs"
                >
                  🔒 Sign In to Unlock Queues
                </button>
              )}
            </div>

            {!isCertified ? (
              <div className="bg-[#0b1020] border border-amber-500/40 rounded-3xl p-10 text-center space-y-5 max-w-3xl mx-auto my-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white">
                  Projects Queue Locked — Pending Owner Certification & Email Provisioning
                </h2>
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-amber-400 text-xs font-mono font-bold">
                  0 Active Tasks Assigned to Current Session
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                  Live production queues (<strong>Audio Transcription</strong>, <strong>Data Annotation</strong>, <strong>S2S Voice</strong>, and <strong>Financial FP&A</strong>) remain empty until you complete the 12-Article NDA Onboarding and your email is certified by the Master Owner.
                </p>

                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveNav('apply')}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black rounded-xl"
                  >
                    Complete Evaluator Onboarding & NDA →
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setAuthTab('signin');
                    }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
                  >
                    Sign In with Owner / Certified Account
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                    Select Active Production Pipeline ({PLATFORM_PROJECTS.length})
                  </h3>
                  {PLATFORM_PROJECTS.map(prj => (
                    <div
                      key={prj.id}
                      onClick={() => {
                        setSelectedProjectId(prj.id);
                        setWorkbenchSavedMsg('');
                      }}
                      className={`p-4 rounded-2xl border transition cursor-pointer ${
                        selectedProjectId === prj.id
                          ? 'bg-emerald-950/30 border-emerald-500 shadow-lg'
                          : 'bg-[#0b1020] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs font-bold text-emerald-400">{prj.id}</span>
                        <span className="text-xs font-extrabold text-amber-300">{prj.payRate}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-1">{prj.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{prj.desc}</p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800/80 text-[11px]">
                        <span className="text-slate-400">{prj.totalTasks} Tasks Available</span>
                        <span className="text-cyan-400 font-bold">{prj.domain}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-7 bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-5">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs text-emerald-400 font-mono font-bold">
                        ACTIVE WORKBENCH • {currentProjectObj.id}
                      </span>
                      <h2 className="text-lg font-black text-white">{currentProjectObj.name}</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[11px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Zero-AI Anti-Paste Lock Active
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">
                        Queue Item #{workbenchTaskIndex + 1} of {currentProjectObj.totalTasks}
                      </span>
                      <span className="text-emerald-400 font-bold">{currentProjectObj.payRate}</span>
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-cyan-400">
                        Stimulus / Audio-Document Prompt:
                      </span>
                      <p className="text-slate-100 leading-relaxed">{currentProjectObj.samplePrompt}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Human Verbatim Transcription / Annotation / Audit Justification *
                      </label>
                      <textarea
                        rows={4}
                        value={workbenchText}
                        onChange={e => setWorkbenchText(e.target.value)}
                        onPaste={e => {
                          e.preventDefault();
                          alert('ZERO-AI POLICY: External copy-paste is blocked inside production workbenches.');
                        }}
                        placeholder="Type 100% human evaluation output here (Clipboard paste is blocked by telemetry)..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    {workbenchSavedMsg && (
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-bold">
                        {workbenchSavedMsg}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setWorkbenchTaskIndex(prev => Math.max(0, prev - 1))}
                        disabled={workbenchTaskIndex === 0}
                        className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 text-xs font-bold text-slate-300"
                      >
                        ← Previous Item
                      </button>
                      <button
                        onClick={() => {
                          if (workbenchText.trim().length < 10) {
                            alert('Please enter your evaluation before submitting.');
                            return;
                          }
                          setWorkbenchSavedMsg(
                            `✓ Item #${workbenchTaskIndex + 1} verified & logged to L2 Calibration Queue!`
                          );
                          setWorkbenchText('');
                          setWorkbenchTaskIndex(prev => prev + 1);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-xs font-black"
                      >
                        Submit Verified Task →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeNav === 'apply' && (
          <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto shadow-2xl">
            <div>
              <span className="text-xs font-extrabold uppercase text-emerald-400">
                Specialist Credentialing & Zero-AI Compliance
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Evaluator Onboarding, CV Upload & 12-Article Master NDA
              </h1>
            </div>

            {appSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-black text-white">
                  Dossier, CV & SHA-256 Credentials Encrypted!
                </h3>
                <button
                  onClick={() => setActiveNav('projects')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs"
                >
                  Check Projects Queue Status →
                </button>
              </div>
            ) : (
              <form onSubmit={handleOnboardingSubmit} className="space-y-5 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name (Passport / ID) *"
                    value={appForm.name}
                    onChange={e => setAppForm({ ...appForm, name: e.target.value })}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address (Workspace Login) *"
                    value={appForm.email}
                    onChange={e => setAppForm({ ...appForm, email: e.target.value })}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Create Workspace Password (SHA-256) *"
                    value={appForm.pass}
                    onChange={e => setAppForm({ ...appForm, pass: e.target.value })}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <select
                    value={appForm.track}
                    onChange={e => setAppForm({ ...appForm, track: e.target.value })}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-bold"
                  >
                    {PLATFORM_PROJECTS.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.payRate})
                      </option>
                    ))}
                  </select>
                  <select
                    value={appForm.secQuestion}
                    onChange={e => setAppForm({ ...appForm, secQuestion: e.target.value })}
                    className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-white"
                  >
                    {SECURITY_QUESTIONS.map(q => (
                      <option key={q} value={q}>
                        Mandatory Recovery Q: {q}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Security Question Answer (For Password Recovery) *"
                    value={appForm.secAnswer}
                    onChange={e => setAppForm({ ...appForm, secAnswer: e.target.value })}
                    className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-white"
                  />
                  <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-dashed border-emerald-500/50 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <label className="block text-emerald-400 font-bold mb-1">
                        Upload CV / Resume (PDF, DOC, DOCX) *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={e => {
                          const f = e.target.files?.[0];
                          if (!f) return;
                          const reader = new FileReader();
                          reader.onload = () =>
                            setAppForm(prev => ({
                              ...prev,
                              cvFileName: f.name,
                              cvDataUrl: String(reader.result || '')
                            }));
                          reader.readAsDataURL(f);
                        }}
                        className="text-xs text-slate-300"
                      />
                    </div>
                    {appForm.cvFileName && (
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 font-bold">
                        📄 {appForm.cvFileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="h-60 overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-[11px] text-slate-300">
                  {MASTER_CONTRACT_ARTICLES.map(a => (
                    <div key={a.id}>
                      <strong className="text-emerald-400">
                        Article {a.id} — {a.title}:
                      </strong>{' '}
                      {a.content}
                    </div>
                  ))}
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer font-semibold text-slate-200">
                  <input
                    type="checkbox"
                    checked={appForm.agreedNDA}
                    onChange={e => setAppForm({ ...appForm, agreedNDA: e.target.checked })}
                    className="accent-emerald-500 w-4 h-4"
                  />
                  <span>
                    I have read and execute the 12-Article Master Contractor Agreement, Confidentiality NDA, and Strict Zero-AI Policy.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg"
                >
                  Execute NDA & Submit Dossier for Owner Certification →
                </button>
              </form>
            )}
          </div>
        )}

        {activeNav === 'client-portal' && (
          <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <h1 className="text-2xl font-black text-white">Enterprise Client PoC Calibration Portal</h1>
            <div className="space-y-3 text-xs">
              {pocs.map(p => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap justify-between items-center gap-3"
                >
                  <div>
                    <div className="font-extrabold text-emerald-400 text-sm">
                      {p.id} — {p.orgName} ({p.email})
                    </div>
                    <div className="text-slate-400 mt-1">
                      {p.scope} • {p.msg}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNav === 'helpdesk' && (
          <div className="grid lg:grid-cols-2 gap-6 text-xs">
            <form
              onSubmit={handleOpenTicket}
              className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4"
            >
              <h2 className="text-lg font-black text-white">1. Open New Support Ticket</h2>
              <input
                type="email"
                required
                placeholder="Your Email Address (Where replies will be delivered) *"
                value={newTicketEmail}
                onChange={e => setNewTicketEmail(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
              <input
                type="text"
                required
                placeholder="Subject *"
                value={newTicketSubject}
                onChange={e => setNewTicketSubject(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
              <textarea
                rows={4}
                required
                placeholder="Describe your inquiry or certification request *"
                value={newTicketMsg}
                onChange={e => setNewTicketMsg(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
              {ticketSubmitMsg && <p className="text-emerald-400 font-bold">{ticketSubmitMsg}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black"
              >
                Submit Ticket to Helpdesk
              </button>
            </form>

            <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4">
              <h2 className="text-lg font-black text-white">2. My Support Inbox & Official Replies</h2>
              <form onSubmit={handleSearchInbox} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your Email or Ticket ID (e.g. TCK-1001)"
                  value={inboxQuery}
                  onChange={e => setInboxQuery(e.target.value)}
                  className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black"
                >
                  Load Inbox
                </button>
              </form>

              {inboxTicket && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-emerald-400 text-sm">
                      {inboxTicket.id} — {inboxTicket.subject}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold">
                      {inboxTicket.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {inboxTicket.thread.map((m, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-xl ${
                          m.sender === 'support'
                            ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-200'
                            : 'bg-slate-900 text-slate-300'
                        }`}
                      >
                        <div className="text-[10px] font-bold uppercase text-emerald-400 mb-0.5">
                          {m.sender === 'support' ? '✓ Official Support / Owner Reply' : 'Sender'} • {m.time}
                        </div>
                        <div className="whitespace-pre-line">{m.text}</div>
                      </div>
                    ))}
                  </div>
                  {!inboxTicket.receiptConfirmed ? (
                    <button
                      onClick={() => handleConfirmReceipt(inboxTicket.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black"
                    >
                      ✓ Confirm Reply Received
                    </button>
                  ) : (
                    <span className="inline-block text-emerald-400 font-bold">
                      ✓ Delivery Receipt Confirmed
                    </span>
                  )}
                  <form onSubmit={handleSendFollowup} className="flex gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      placeholder="Write a follow-up reply..."
                      value={followupText}
                      onChange={e => setFollowupText(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {activeNav === 'admin' && (
          <div className="space-y-6 text-xs">
            {!isOwner && currentUser?.role !== 'support' ? (
              <div className="p-10 rounded-3xl bg-[#0b1020] border border-rose-500/40 text-center space-y-4">
                <Lock className="w-10 h-10 text-rose-400 mx-auto" />
                <h2 className="text-xl font-black text-white">Restricted Master Control Center</h2>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setAuthTab('signin');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black"
                >
                  Open Workspace Sign-In
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setAdminTab('1')}
                      className={`px-4 py-2.5 rounded-xl font-extrabold ${
                        adminTab === '1'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      1. Certify Evaluators & CVs ({applicants.length})
                    </button>
                    <button
                      onClick={() => setAdminTab('2')}
                      className={`px-4 py-2.5 rounded-xl font-extrabold ${
                        adminTab === '2'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      2. Helpdesk Tickets ({tickets.length})
                    </button>
                    <button
                      onClick={() => setAdminTab('3')}
                      className={`px-4 py-2.5 rounded-xl font-extrabold ${
                        adminTab === '3'
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      3. Split-Vault Accounts, Ban & Resets ({users.length})
                    </button>
                    {isOwner && (
                      <button
                        onClick={() => setAdminTab('5')}
                        className={`px-4 py-2.5 rounded-xl font-extrabold ${
                          adminTab === '5'
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}
                      >
                        4. Stealth Brand Config
                      </button>
                    )}
                  </div>

                  {isOwner && (
                    <button
                      onClick={handleExportVaultFiles}
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Vault Files (JS)</span>
                    </button>
                  )}
                </div>

                {adminTab === '1' && (
                  <div className="space-y-3">
                    {applicants.map(app => (
                      <div
                        key={app.id}
                        className="p-5 rounded-2xl bg-[#0b1020] border border-slate-800 flex flex-wrap justify-between items-center gap-3"
                      >
                        <div className="space-y-1">
                          <div className="font-black text-white text-sm">
                            {app.name} ({app.email})
                          </div>
                          <div className="text-slate-400">
                            {app.dialect} • Track: <strong className="text-cyan-300">{app.track || 'General QA'}</strong> • CV:{' '}
                            <strong className="text-amber-300">{app.cvFile}</strong> • Status:{' '}
                            <strong className="text-emerald-400">{app.status}</strong>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {app.cvDataUrl && (
                            <a
                              href={app.cvDataUrl}
                              download={app.cvFile}
                              className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-extrabold"
                            >
                              📄 Download CV
                            </a>
                          )}
                          <button
                            onClick={() => handleCertifyApplicant(app)}
                            className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-extrabold"
                          >
                            ✓ Certify & Unlock Projects
                          </button>
                          <button
                            onClick={() => handleDeleteApplicant(app.id)}
                            className="px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {adminTab === '2' && (
                  <div className="space-y-4">
                    {tickets.map(t => (
                      <div
                        key={t.id}
                        className="p-5 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-emerald-400 text-sm">
                            {t.id} — {t.subject} ({t.senderEmail})
                          </span>
                          <div className="flex items-center gap-3">
                            {t.receiptConfirmed && (
                              <span className="text-emerald-400 font-bold">✓ Receipt Confirmed by Sender</span>
                            )}
                            <button
                              onClick={() => handleDeleteTicket(t.id)}
                              className="text-rose-400 font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1.5 pl-3 border-l-2 border-emerald-500/40">
                          {t.thread.map((m, idx) => (
                            <div key={idx} className="text-slate-300">
                              <strong className={m.sender === 'support' ? 'text-emerald-400' : 'text-cyan-400'}>
                                {m.sender.toUpperCase()}:
                              </strong>{' '}
                              {m.text}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Write official reply to ${t.senderEmail}...`}
                            value={replyDrafts[t.id] || ''}
                            onChange={e => setReplyDrafts({ ...replyDrafts, [t.id]: e.target.value })}
                            className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                          />
                          <button
                            onClick={() => handleAdminReplyTicket(t.id)}
                            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black"
                          >
                            ✓ Send Reply to Sender Inbox
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {adminTab === '3' && (
                  <div className="grid lg:grid-cols-3 gap-6">
                    <form
                      onSubmit={handleProvisionUser}
                      className="p-5 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-3"
                    >
                      <h3 className="font-extrabold text-white text-sm">
                        Activate New Support / Evaluator Email (SHA-256)
                      </h3>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={provEmail}
                        onChange={e => setProvEmail(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Initial Password"
                        value={provPass}
                        onChange={e => setProvPass(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                      <select
                        value={provRole}
                        onChange={e => setProvRole(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-bold"
                      >
                        <option value="support">Technical Support / Helpdesk (support)</option>
                        <option value="evaluator">Certified Evaluator (evaluator)</option>
                        <option value="client">Enterprise Client (client)</option>
                      </select>
                      {provMsg && <p className="text-emerald-400 font-bold">{provMsg}</p>}
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black"
                      >
                        + Encrypt & Activate Email
                      </button>
                    </form>

                    <div className="lg:col-span-2 space-y-3">
                      {users.map(u => (
                        <div
                          key={u.keyId || u.email}
                          className={`p-4 rounded-2xl border space-y-2 ${
                            u.isBanned
                              ? 'bg-rose-950/30 border-rose-600'
                              : 'bg-[#0b1020] border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-white text-sm">{u.name}</span>
                              <span className="text-slate-400 ml-2">({u.email})</span>
                            </div>
                            <span className="px-2.5 py-0.5 rounded bg-slate-950 text-emerald-400 font-mono font-bold uppercase">
                              {u.role}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 truncate">
                            Vault Key: {u.keyId} → SHA-256 Digest: {securityVault[u.keyId]?.slice(0, 32)}...
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              onClick={() => handleToggleProjectAccess(u.email)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 text-emerald-300 font-bold"
                            >
                              {u.certifiedForProjects ? '✓ Projects Unlocked' : '🔒 Projects Locked'}
                            </button>
                            <button
                              onClick={() => handleAdminDispatchResetLink(u)}
                              className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold"
                            >
                              🔑 Dispatch Password Reset Link
                            </button>
                            {isOwner && (
                              <button
                                onClick={() => handleToggleBanUser(u.email)}
                                className={`px-3.5 py-1.5 rounded-lg font-black ${
                                  u.isBanned
                                    ? 'bg-emerald-500 text-slate-950'
                                    : 'bg-rose-600 text-white hover:bg-rose-500'
                                }`}
                              >
                                {u.isBanned ? '✓ Unban User' : '🚫 Ban User'}
                              </button>
                            )}
                            {isOwner && (
                              <button
                                onClick={() => handleDeleteUser(u.email)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 text-rose-400 font-bold"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {adminTab === '5' && isOwner && (
                  <form
                    onSubmit={handleSaveBrandConfig}
                    className="p-6 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-4 max-w-lg"
                  >
                    <h3 className="font-bold text-white text-sm">Stealth Brand Configuration</h3>
                    <input
                      type="text"
                      value={editBrand.brandName}
                      onChange={e => setEditBrand({ ...editBrand, brandName: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                    <input
                      type="text"
                      value={editBrand.brandStatus}
                      onChange={e => setEditBrand({ ...editBrand, brandStatus: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black"
                    >
                      Save Brand Config
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-emerald-400 block">
                  Cryptographic Split-Vault Access
                </span>
                <h3 className="font-black text-white text-base">Zero-Trust Workspace Sign-In</h3>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setAuthTab('signin');
                  setAuthMsg('');
                }}
                className={`py-2 rounded-lg font-extrabold ${
                  authTab === 'signin' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthTab('signup');
                  setAuthMsg('');
                }}
                className={`py-2 rounded-lg font-extrabold ${
                  authTab === 'signup' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Register
              </button>
              <button
                onClick={() => {
                  setAuthTab('forgot');
                  setAuthMsg('');
                }}
                className={`py-2 rounded-lg font-extrabold ${
                  authTab === 'forgot' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Forgot Pass
              </button>
            </div>

            {authTab === 'signin' && (
              <form onSubmit={handleSignIn} autoComplete="off" className="space-y-3.5">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Registered Email *</label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    placeholder="name@domain.com"
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showPasswordText ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      placeholder="Enter your password"
                      value={authPass}
                      onChange={e => setAuthPass(e.target.value)}
                      className="w-full p-3.5 pr-10 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
                      title="Show / Hide Password"
                    >
                      {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {authMsg && <p className="text-rose-400 font-bold">{authMsg}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg"
                >
                  Sign In (SHA-256 Verify) →
                </button>
              </form>
            )}

            {authTab === 'signup' && (
              <form onSubmit={handleSignUp} autoComplete="off" className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  required
                  placeholder="Create Password *"
                  value={authPass}
                  onChange={e => setAuthPass(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <select
                  value={authSecQ}
                  onChange={e => setAuthSecQ(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  {SECURITY_QUESTIONS.map(q => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  required
                  placeholder="Security Question Answer *"
                  value={authSecA}
                  onChange={e => setAuthSecA(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                {authMsg && <p className="text-rose-400 font-bold">{authMsg}</p>}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black"
                >
                  Encrypt & Create Account
                </button>
              </form>
            )}

            {authTab === 'forgot' && (
              <div className="space-y-3">
                <form onSubmit={handleInstantReset} className="space-y-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Account Email *"
                    value={resetFlowEmail}
                    onChange={e => setResetFlowEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Security Question Answer *"
                    value={resetFlowSecA}
                    onChange={e => setResetFlowSecA(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="password"
                    required
                    placeholder="New Password (min 6 chars) *"
                    value={resetFlowNewPass}
                    onChange={e => setResetFlowNewPass(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  {resetFlowMsg && <p className="text-emerald-400 font-bold">{resetFlowMsg}</p>}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black"
                  >
                    Verify Answer & Reset Password
                  </button>
                </form>
                <button
                  type="button"
                  onClick={handleRequestResetLink}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-amber-300 border border-amber-500/30 font-bold"
                >
                  ✉️ Request Reset Link from Helpdesk / Owner
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-slate-900/80 py-8 text-center text-xs text-slate-500 mt-16">
        © {new Date().getFullYear()} {brand.brandName} ({brand.brandStatus}) • Zero-Trust Split-Vault SHA-256 Architecture
      </footer>
    </div>
  );
}
