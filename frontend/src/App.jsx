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

const INITIAL_PLATFORM_CONFIG = {
  brandName: 'STEALTH AI QA',
  brandStatus: 'Pre-Launch Stealth Mode',
  tagline: 'Sovereign Arabic AI & Multimodal LLM Quality Assurance Agency',
  regionBadge: 'MENA & Sovereign AI Nodes',
  leadArchitect: 'Abdelrhman Maroxo',
  leadTitle: 'Founding AI QA Architect'
};

const MASTER_CONTRACT_ARTICLES = [
  { id: "1.1", title: "Confidentiality & Non-Disclosure Scope", content: "All datasets, audio files, guidelines, and benchmark prompts remain strictly confidential." },
  { id: "1.2", title: "Strict Zero-AI Policy & Authenticity Guarantee", content: "Evaluators MUST NOT use external generative AI (ChatGPT, Claude, Gemini, Copilot) to generate evaluations. Human-only evaluation is mandatory." },
  { id: "1.3", title: "Data Handling & Storage Restrictions", content: "No downloading, screenshots, or local caching of task data outside the provided sandbox environment." },
  { id: "1.4", title: "Intellectual Property Ownership", content: "All annotations, transcriptions, and evaluation outputs produced are sole property of the agency and its enterprise clients." },
  { id: "1.5", title: "Quality Assurance & SLA Compliance", content: "Outputs are subjected to multi-tiered L1/L2 audit. Rejection rate above 5% may result in task reassignment." },
  { id: "1.6", title: "Anti-Cheat & Telemetry Auditing", content: "The platform logs focus shifts, copy-paste attempts, and typing cadence to enforce integrity." },
  { id: "1.7", title: "Independent Contractor Status", content: "Evaluators operate as certified independent evaluators and not direct employees." },
  { id: "1.8", title: "Conflict of Interest Avoidance", content: "Evaluators must disclose any concurrent employment or contractor roles with third-party AI benchmark projects." },
  { id: "1.9", title: "Compensation & Payout Terms", content: "Payouts are disbursed upon client verification and quality milestone approval." },
  { id: "1.10", title: "Termination & Breach Remedies", content: "Any breach of Zero-AI policy or NDA results in immediate account suspension and revocation of project access." },
  { id: "1.11", title: "Jurisdiction & Governing Law", content: "This contract is governed under applicable international commercial arbitration standards." },
  { id: "1.12", title: "Term Duration & Survival Clauses", content: "Confidentiality obligations survive for 5 years post project completion." }
];

const AUDIT_TELEMETRY_SAMPLES = [
  { id: "QA-S2S-9081", domain: "Voice AI S2S", metric: "Latency & Acoustic WER", score: "99.4%", status: "VERIFIED", timestamp: "2026-10-30 14:22:01", json: { latency_ms: 180, wer: 0.012, dialect: "Egyptian Arabic", noise_robustness: "High" } },
  { id: "QA-FPA-4412", domain: "FP&A Financial RAG", metric: "Math & Table Alignment", score: "100.0%", status: "VERIFIED", timestamp: "2026-10-30 13:58:44", json: { table_accuracy: 1.0, math_veracity: "Flawless", OCR_confidence: 0.998 } },
  { id: "QA-SEC-7730", domain: "Adversarial Red-Teaming", metric: "Jailbreak Immunity", score: "98.8%", status: "VERIFIED", timestamp: "2026-10-30 11:15:30", json: { attacks_blocked: 49, unsafe_leakage: 0, severity: "Critical Pass" } }
];

const PLATFORM_PROJECTS = [
  { id: "PRJ-TRN-101", name: "Audio Transcription & Diarization", desc: "Egyptian & Gulf Banking Call-Center Verbatim Transcription with speaker diarization and noise tags.", domain: "Speech & Audio", totalTasks: 1250, payRate: "$18/hr" },
  { id: "PRJ-ANN-204", name: "Data Annotation & Semantic Labeling", desc: "Multimodal Document OCR, Receipt & Financial Table Annotation + L1/L2/L3 Timeline Labeling.", domain: "Multimodal Vision", totalTasks: 840, payRate: "$22/hr" },
  { id: "PRJ-S2S-309", name: "Speech-to-Speech (S2S) Calibration", desc: "Real-time voice agent pitch, tone, emotion, and dialect alignment benchmark.", domain: "Voice AI", totalTasks: 600, payRate: "$25/hr" },
  { id: "PRJ-FPA-412", name: "Financial Modeling & FP&A Audit", desc: "Audit complex Arabic/English balance sheets, earnings reports, and RAG retrieval accuracy.", domain: "FinTech RAG", totalTasks: 450, payRate: "$30/hr" },
  { id: "PRJ-RLH-518", name: "RLHF & Adversarial Red-Teaming", desc: "Safety alignment, jailbreak prompt injection testing, and preference ranking for Arabic LLMs.", domain: "Safety & RLHF", totalTasks: 920, payRate: "$28/hr" }
];

export default function App() {
  const [brand, setBrand] = useState(() => {
    const saved = localStorage.getItem('platform_config');
    return saved ? JSON.parse(saved) : INITIAL_PLATFORM_CONFIG;
  });

  const [activeNav, setActiveNav] = useState('home');

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('current_user_v7');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('accounts_registry_v7');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS_REGISTRY;
  });

  const [securityVault, setSecurityVault] = useState(() => {
    const saved = localStorage.getItem('security_vault_v7');
    return saved ? JSON.parse(saved) : INITIAL_SECURITY_VAULT;
  });

  const [applicants, setApplicants] = useState(() => {
    const saved = localStorage.getItem('evaluator_applicants_v7');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'APP-901',
        name: 'Sami Al-Mansoor',
        email: 'sami.evaluator@example.com',
        dialect: 'Gulf / Saudi Banking',
        cvFile: 'Sami_CV_Acoustics.pdf',
        cvDataUrl: '',
        secQuestion: 'What city were you born in?',
        secAnswer: 'Riyadh',
        status: 'PENDING',
        appliedAt: '2026-10-29'
      }
    ];
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('support_tickets_v7');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'TCK-1001',
        senderEmail: 'sami.evaluator@example.com',
        subject: 'Project Certification Status Check',
        thread: [
          { sender: 'user', text: 'Hello, I submitted my NDA and security questions. Is my project queue unlocked?', time: '2026-10-30 09:15' }
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
    const saved = localStorage.getItem('poc_requests_v7');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'POC-301',
        orgName: 'Sovereign Telecommunications Lab',
        email: 'cto@gov-telecom.ae',
        scope: 'Arabic Speech-to-Speech & Call-Center Diarization',
        msg: 'Requesting 50-sample diagnostic PoC benchmark for Egyptian & Gulf accents.',
        status: 'APPROVED',
        submittedAt: '2026-10-28'
      }
    ];
  });

  const [resets, setResets] = useState(() => {
    const saved = localStorage.getItem('password_resets_v7');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('platform_config', JSON.stringify(brand));
  }, [brand]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('current_user_v7', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('current_user_v7');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('accounts_registry_v7', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('security_vault_v7', JSON.stringify(securityVault));
  }, [securityVault]);

  useEffect(() => {
    localStorage.setItem('evaluator_applicants_v7', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('support_tickets_v7', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('poc_requests_v7', JSON.stringify(pocs));
  }, [pocs]);

  useEffect(() => {
    localStorage.setItem('password_resets_v7', JSON.stringify(resets));
  }, [resets]);

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

  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authSecQ, setAuthSecQ] = useState(SECURITY_QUESTIONS[0]);
  const [authSecA, setAuthSecA] = useState('');
  const [authMsg, setAuthMsg] = useState('');

  const [resetFlowEmail, setResetFlowEmail] = useState('');
  const [resetFlowSecA, setResetFlowSecA] = useState('');
  const [resetFlowNewPass, setResetFlowNewPass] = useState('');
  const [resetTokenInput, setResetTokenInput] = useState('');
  const [resetFlowMsg, setResetFlowMsg] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('reset-email=') && hash.includes('token=')) {
      const cleanHash = hash.replace('#', '?');
      const params = new URLSearchParams(cleanHash);
      const email = params.get('reset-email');
      const token = params.get('token');
      if (email) {
        setResetFlowEmail(email);
        setResetTokenInput(token || '');
        setAuthTab('forgot');
        setShowAuthModal(true);
      }
    }
  }, []);

  const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    dialect: 'Egyptian & Levant Banking Dialects',
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

  const [inspectJsonId, setInspectJsonId] = useState(null);

  const [adminTab, setAdminTab] = useState('1');
  const [replyDrafts, setReplyDrafts] = useState({});

  const [provEmail, setProvEmail] = useState('');
  const [provPass, setProvPass] = useState('TempPass2026!');
  const [provRole, setProvRole] = useState('evaluator');
  const [provCertified, setProvCertified] = useState(true);
  const [provMsg, setProvMsg] = useState('');

  const [editBrand, setEditBrand] = useState({ ...brand });

  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-TRN-101');
  const [workbenchTaskIndex, setWorkbenchTaskIndex] = useState(0);

  const isOwner = currentUser?.role === 'owner' || currentUser?.keyId === 'KEY-MASTER-OWNER';
  const isCertified = isOwner || currentUser?.certifiedForProjects || currentUser?.role === 'support';

  // Auto-load user's tickets when opening Helpdesk Inbox while logged in
  useEffect(() => {
    if (activeNav === 'helpdesk' && currentUser?.email) {
      setInboxQuery(currentUser.email);
      const found = tickets.find(t => t.senderEmail.toLowerCase() === currentUser.email.toLowerCase());
      if (found) {
        setInboxTicket(found);
      }
    }
  }, [activeNav, currentUser, tickets]);

  // ==========================================================================
  // ZERO-PLAINTEXT SHA-256 SPLIT-VAULT SIGN IN
  // ==========================================================================
  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    const emailClean = authEmail.trim().toLowerCase();
    const passClean = authPass.trim();

    const enteredDigest = await computeVaultDigest(emailClean, passClean);

    // 1. Check Master Owner SHA-256 Digest FIRST (Always overrides any duplicate evaluator record)
    if (enteredDigest === MASTER_OWNER_VAULT_DIGEST) {
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

    // 2. Verify against Accounts Registry + Separated Security Vault
    const found = users.find(u => u.email.toLowerCase() === emailClean);
    if (!found) {
      setAuthMsg('Invalid email or password. Make sure you are on the "Sign In" tab.');
      return;
    }

    if (found.isBanned || found.status === 'BANNED') {
      setAuthMsg('ACCOUNT TERMINATED: Your access has been permanently revoked by the Master Owner.');
      return;
    }

    if (found.status === 'SUSPENDED') {
      setAuthMsg('Account is temporarily suspended. Contact Helpdesk.');
      return;
    }

    const expectedDigest = securityVault[found.keyId];
    if (expectedDigest && enteredDigest === expectedDigest) {
      setCurrentUser(found);
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPass('');
    } else {
      setAuthMsg('Invalid email or password.');
    }
  };

  // ==========================================================================
  // SIGN UP (WITH OWNER PROTECTION IF ENTERED IN REGISTER BY MISTAKE)
  // ==========================================================================
  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    if (!authEmail || !authPass || !authSecA) {
      setAuthMsg('Please fill all mandatory fields including security question answer.');
      return;
    }
    const cleanEmail = authEmail.trim().toLowerCase();
    const digest = await computeVaultDigest(cleanEmail, authPass.trim());

    // Owner Protection: If Master Owner types credentials in Register tab, log in as Owner!
    if (digest === MASTER_OWNER_VAULT_DIGEST) {
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
      setAuthEmail('');
      setAuthPass('');
      setAuthSecA('');
      setActiveNav('admin');
      return;
    }

    const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      setAuthMsg('An account with this email already exists. Switch to Sign In.');
      return;
    }
    const newKeyId = 'KEY-USR-' + Date.now();

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
    setResetFlowMsg('Password encrypted (SHA-256) and updated! You can now sign in.');
  };

  const handleRequestResetLink = (e) => {
    e.preventDefault();
    setResetFlowMsg('');
    if (!resetFlowEmail) {
      setResetFlowMsg('Please enter your account email.');
      return;
    }
    const resetId = 'RST-' + Math.floor(1000 + Math.random() * 9000);
    const token = 'TOK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const newReset = {
      id: resetId,
      email: resetFlowEmail.trim(),
      token: token,
      requestedAt: new Date().toLocaleString(),
      status: 'PENDING'
    };
    setResets(prev => [...prev, newReset]);

    const resetTicket = {
      id: resetId,
      senderEmail: resetFlowEmail.trim(),
      subject: `Password Reset Link Request (${resetId})`,
      thread: [
        { sender: 'user', text: `System Request: Password reset requested for ${resetFlowEmail}. Generated Token: ${token}`, time: new Date().toLocaleString() }
      ],
      status: 'OPEN',
      createdAt: new Date().toLocaleString(),
      viewedBySender: false,
      viewedAt: null,
      receiptConfirmed: false
    };
    setTickets(prev => [resetTicket, ...prev]);

    setResetFlowMsg(`Reset request submitted (${resetId})! Token logged for Helpdesk/Owner: ${token}`);
  };

  const handleOpenTicket = (e) => {
    e.preventDefault();
    if (!newTicketEmail || !newTicketMsg) return;
    const tckId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
    const newT = {
      id: tckId,
      senderEmail: newTicketEmail.trim(),
      subject: newTicketSubject || 'General Technical Support',
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
    setTicketSubmitMsg(`Ticket created successfully! ID: ${tckId}. Replies will appear directly on the right panel.`);
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
    if (inboxTicket && inboxTicket.id === ticketId) {
      setInboxTicket(null);
    }
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
          status: 'REPLIED'
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
      secAnswer: 'DefaultAnswer',
      status: 'ACTIVE',
      isBanned: false
    };
    setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
    setUsers(prev => [...prev, newU]);
    setProvMsg(`Account ${cleanEmail} encrypted into SHA-256 Vault (${provRole})!`);
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
    setResets(prev => [...prev, { id: 'RST-' + Date.now(), email: user.email, token, requestedAt: new Date().toLocaleString(), status: 'PENDING' }]);

    const resetTicket = {
      id: 'RST-' + Math.floor(1000 + Math.random() * 9000),
      senderEmail: user.email,
      subject: 'Official Password Reset Link & Temporary Credentials',
      thread: [
        {
          sender: 'support',
          text: `Hello, your password reset link has been generated by Helpdesk/Owner.\nTemporary Password: ${tempPass}\nReset Token: ${token}\nDirect Reset URL: ${resetUrl}`,
          time: new Date().toLocaleString()
        }
      ],
      status: 'REPLIED',
      createdAt: new Date().toLocaleString(),
      viewedBySender: false,
      viewedAt: null,
      receiptConfirmed: false
    };
    setTickets(prev => [resetTicket, ...prev]);
    alert(`Reset link dispatched to ${user.email} ticket inbox!\nTemp Pass: ${tempPass}\nToken: ${token}`);
  };

  const handleDeleteUser = (email) => {
    setUsers(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
  };

  const handleSaveBrandConfig = (e) => {
    e.preventDefault();
    setBrand(editBrand);
    alert('Stealth Brand Config updated successfully across the entire platform!');
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !appForm.secAnswer || !appForm.agreedNDA) {
      alert('Please fill all mandatory fields and accept the 12-Article Master Contract NDA.');
      return;
    }
    const cleanEmail = appForm.email.trim().toLowerCase();
    const rawPass = appForm.pass || 'EvalPass2026!';
    const digest = await computeVaultDigest(cleanEmail, rawPass);

    if (digest === MASTER_OWNER_VAULT_DIGEST) {
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
    const appObj = {
      id: 'APP-' + Math.floor(100 + Math.random() * 900),
      keyId: newKeyId,
      name: appForm.name,
      email: cleanEmail,
      dialect: appForm.dialect,
      cvFile: appForm.cvFileName || 'Uploaded_CV.pdf',
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-black">
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNav('home')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-950">
            <Shield className="w-6 h-6 text-cyan-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-cyan-400">{brand.brandName}</span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold">
                {brand.brandStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">{brand.tagline}</p>
          </div>
        </div>

        <nav className="flex items-center flex-wrap gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveNav('home')}
            className={`px-3 py-1.5 rounded-md transition ${activeNav === 'home' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Enterprise Solutions
          </button>
          <button
            onClick={() => setActiveNav('about')}
            className={`px-3 py-1.5 rounded-md transition ${activeNav === 'about' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            About Us, Team & Clients
          </button>
          <button
            onClick={() => setActiveNav('projects')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1 ${activeNav === 'projects' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Projects
            {!isCertified && <Lock className="w-3 h-3 text-amber-400 ml-0.5" />}
          </button>
          <button
            onClick={() => setActiveNav('apply')}
            className={`px-3 py-1.5 rounded-md transition ${activeNav === 'apply' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Evaluator Onboarding & NDA
          </button>
          <button
            onClick={() => setActiveNav('client-portal')}
            className={`px-3 py-1.5 rounded-md transition ${activeNav === 'client-portal' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Client Portal
          </button>
          <button
            onClick={() => setActiveNav('helpdesk')}
            className={`px-3 py-1.5 rounded-md transition ${activeNav === 'helpdesk' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            Helpdesk Inbox
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-semibold block text-slate-200">{currentUser.name || currentUser.email}</span>
                <span className="text-[10px] text-cyan-400 uppercase tracking-wider">{currentUser.role} (SHA-256)</span>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="ml-2 text-slate-500 hover:text-rose-400 text-xs font-bold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setShowAuthModal(true); setAuthTab('signin'); setAuthMsg(''); }}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Key className="w-3.5 h-3.5" />
              Workspace Sign-In
            </button>
          )}

          {(isOwner || currentUser?.role === 'support') && (
            <button
              onClick={() => setActiveNav('admin')}
              className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1"
              title="Master Control Center"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">Master Admin</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8">
        {/* HOME */}
        {activeNav === 'home' && (
          <div className="space-y-10">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                  <ShieldCheck className="w-4 h-4" />
                  {brand.regionBadge} — {brand.brandStatus}
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Sovereign Arabic AI & Multimodal LLM Quality Assurance
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Enterprise-grade evaluation, acoustic diarization, financial modeling RAG audit, and adversarial red-teaming for sovereign foundation models. Operating under strict zero-AI human verification standards.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveNav('apply')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950"
                  >
                    Apply as Evaluator
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#poc-request"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold"
                  >
                    Request 50-Sample Diagnostic PoC
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-cyan-400" />
                    Live Audit Telemetry Samples
                  </h2>
                  <p className="text-xs text-slate-400">Real-time benchmark evaluation logs and JSON verification payloads</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase bg-slate-950/50">
                      <th className="py-3 px-4">Telemetry ID</th>
                      <th className="py-3 px-4">Domain</th>
                      <th className="py-3 px-4">Metric Tested</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {AUDIT_TELEMETRY_SAMPLES.map(sample => (
                      <React.Fragment key={sample.id}>
                        <tr className="hover:bg-slate-800/50 transition">
                          <td className="py-3 px-4 font-mono font-bold text-cyan-400">{sample.id}</td>
                          <td className="py-3 px-4 font-medium">{sample.domain}</td>
                          <td className="py-3 px-4 text-slate-400">{sample.metric}</td>
                          <td className="py-3 px-4 font-bold text-emerald-400">{sample.score}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                              {sample.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500">{sample.timestamp}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setInspectJsonId(inspectJsonId === sample.id ? null : sample.id)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono text-[11px] font-bold flex items-center gap-1 ml-auto"
                            >
                              <Terminal className="w-3 h-3" />
                              {inspectJsonId === sample.id ? 'Close' : '{ } Inspect JSON'}
                            </button>
                          </td>
                        </tr>
                        {inspectJsonId === sample.id && (
                          <tr className="bg-slate-950">
                            <td colSpan={7} className="p-4 border-t border-b border-slate-800">
                              <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400">
                                <span className="text-slate-500 block mb-1">// JSON Payload Inspector - {sample.id}</span>
                                <pre className="whitespace-pre-wrap">{JSON.stringify(sample.json, null, 2)}</pre>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="poc-request" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-cyan-400" />
                  Request 50-Sample Diagnostic PoC
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enterprise clients can request a non-binding 50-prompt diagnostic benchmark evaluation for Arabic LLMs, Speech-to-Speech models, or FP&A RAG systems.
                </p>
              </div>

              {pocDone ? (
                <div className="bg-emerald-950/80 border border-emerald-800 rounded-xl p-6 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Diagnostic PoC Request Submitted</h3>
                  <button
                    onClick={() => setPocDone(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePocSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Lab Name *</label>
                    <input
                      type="text"
                      required
                      value={pocForm.orgName}
                      onChange={e => setPocForm({ ...pocForm, orgName: e.target.value })}
                      placeholder="e.g. Sovereign AI Research Lab"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Enterprise Email *</label>
                    <input
                      type="email"
                      required
                      value={pocForm.email}
                      onChange={e => setPocForm({ ...pocForm, email: e.target.value })}
                      placeholder="e.g. engineering@sovereign-ai.gov"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Evaluation Scope</label>
                    <select
                      value={pocForm.scope}
                      onChange={e => setPocForm({ ...pocForm, scope: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      <option>Speech & Audio (S2S / Diarization)</option>
                      <option>FinTech RAG & FP&A Table Alignment</option>
                      <option>Safety Jailbreak & Red-Teaming</option>
                      <option>Multimodal OCR & Document Annotation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Benchmark Notes / Requirements</label>
                    <input
                      type="text"
                      value={pocForm.notes}
                      onChange={e => setPocForm({ ...pocForm, notes: e.target.value })}
                      placeholder="Specify dialects, prompt sizes, or latency SLA"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg"
                    >
                      Submit 50-Sample Diagnostic PoC Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ABOUT US */}
        {activeNav === 'about' && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
              <div>
                <span className="px-3 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold uppercase">
                  {brand.brandStatus}
                </span>
                <h1 className="text-3xl font-extrabold text-white mt-3">About {brand.brandName}</h1>
                <p className="text-slate-300 text-sm leading-relaxed mt-2">
                  Operating in pre-launch stealth mode, {brand.brandName} provides sovereign AI quality assurance, rigorous human-in-the-loop validation, and adversarial red-teaming tailored for Arabic regional dialects and enterprise vertical models.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Executive Architecture</h3>
                  <p className="text-xs text-cyan-400 font-medium">{brand.leadArchitect} — {brand.leadTitle}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Directing sovereign LLM benchmark frameworks, zero-AI integrity verification, and enterprise red-teaming telemetry protocols.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 font-bold">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">Acoustic & Transcription Division</h3>
                  <p className="text-xs text-blue-400 font-medium">S2S & Call-Center Benchmarks</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Specialized phonetic annotators evaluating Egyptian, Gulf, Levantine, and Maghrebi verbatim audio and speaker diarization.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">STEM, Finance & Annotation QA</h3>
                  <p className="text-xs text-emerald-400 font-medium">FP&A & RAG Verification</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Subject matter experts auditing Arabic financial statements, OCR receipt bounding boxes, and complex mathematical reasoning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROJECTS WORKSPACE */}
        {activeNav === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                  Enterprise Benchmark Projects
                </h1>
                <p className="text-xs text-slate-400">Active evaluation pipelines and task workbenches</p>
              </div>
              {isCertified && (
                <div className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Projects Unlocked — Certified Access
                </div>
              )}
            </div>

            {!isCertified ? (
              <div className="bg-slate-900 border border-amber-900/50 rounded-2xl p-10 text-center space-y-4 max-w-2xl mx-auto my-8">
                <div className="w-16 h-16 rounded-full bg-amber-950 border border-amber-800 flex items-center justify-center mx-auto text-amber-400">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Projects Queue Locked — Pending Owner Certification & Email Provisioning
                </h2>
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-amber-400 text-xs font-mono font-bold">
                  0 Tasks Assigned
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  Your account is awaiting manual verification by the Founding Owner. Once your onboarding NDA is approved and email is certified, live task workbenches will unlock automatically.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Available Pipelines</h3>
                  {PLATFORM_PROJECTS.map(prj => (
                    <div
                      key={prj.id}
                      onClick={() => setSelectedProjectId(prj.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer ${selectedProjectId === prj.id ? 'bg-cyan-950/60 border-cyan-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-cyan-400">{prj.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">{prj.domain}</span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-1">{prj.name}</h4>
                      <p className="text-xs text-slate-400 mt-1">{prj.desc}</p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800 text-[11px]">
                        <span className="text-slate-400">{prj.totalTasks} Tasks Available</span>
                        <span className="font-bold text-emerald-400">{prj.payRate}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs text-cyan-400 font-mono font-bold">WORKBENCH SANDBOX</span>
                      <h2 className="text-lg font-bold text-white">
                        {PLATFORM_PROJECTS.find(p => p.id === selectedProjectId)?.name}
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Zero-AI Copy/Paste Restricted
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                    <textarea
                      rows={4}
                      onPaste={e => { e.preventDefault(); alert('ZERO-AI POLICY: External paste is disabled.'); }}
                      placeholder="Type verbatim human evaluation here (Copy-Paste disabled by telemetry sandbox)..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          alert('Task submitted to L1 Audit Queue successfully!');
                          setWorkbenchTaskIndex(prev => prev + 1);
                        }}
                        className="px-5 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      >
                        Submit Evaluation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* APPLY & 12-SECTION NDA */}
        {activeNav === 'apply' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white">Evaluator Onboarding, CV Upload & 12-Section NDA</h1>
            {appSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Application & SHA-256 Credentials Logged!</h3>
                <p className="text-xs text-slate-300">Your dossier is pending Owner certification to unlock the Projects queue.</p>
              </div>
            ) : (
              <form onSubmit={handleOnboardingSubmit} className="space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name *"
                    value={appForm.name}
                    onChange={e => setAppForm({ ...appForm, name: e.target.value })}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={appForm.email}
                    onChange={e => setAppForm({ ...appForm, email: e.target.value })}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Create Password (SHA-256 Encrypted) *"
                    value={appForm.pass}
                    onChange={e => setAppForm({ ...appForm, pass: e.target.value })}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  />
                  <select
                    value={appForm.secQuestion}
                    onChange={e => setAppForm({ ...appForm, secQuestion: e.target.value })}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                  >
                    {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="Security Question Answer *"
                    value={appForm.secAnswer}
                    onChange={e => setAppForm({ ...appForm, secAnswer: e.target.value })}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-white sm:col-span-2"
                  />
                  <div className="sm:col-span-2 p-3 rounded-lg bg-slate-950 border border-dashed border-cyan-700">
                    <label className="block text-cyan-400 font-bold mb-1">Upload CV / Resume (PDF, DOCX) *</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const reader = new FileReader();
                        reader.onload = () => setAppForm(prev => ({ ...prev, cvFileName: f.name, cvDataUrl: String(reader.result || '') }));
                        reader.readAsDataURL(f);
                      }}
                      className="text-xs text-slate-300"
                    />
                  </div>
                </div>

                <div className="h-56 overflow-y-auto p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono">
                  {MASTER_CONTRACT_ARTICLES.map(a => (
                    <div key={a.id}>
                      <strong className="text-cyan-400">Article {a.id} — {a.title}:</strong> {a.content}
                    </div>
                  ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={appForm.agreedNDA}
                    onChange={e => setAppForm({ ...appForm, agreedNDA: e.target.checked })}
                  />
                  <span>I accept the 12-Article Master Contractor Agreement & Strict Zero-AI Policy.</span>
                </label>

                <button type="submit" className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold">
                  Submit Onboarding Dossier
                </button>
              </form>
            )}
          </div>
        )}

        {/* CLIENT PORTAL */}
        {activeNav === 'client-portal' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h1 className="text-xl font-bold text-white">Enterprise Client PoC Portal</h1>
            <div className="space-y-3 text-xs">
              {pocs.map(p => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-cyan-400">{p.id} — {p.orgName} ({p.email})</div>
                    <div className="text-slate-400">{p.scope} • {p.msg}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 font-bold">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HELPDESK INBOX */}
        {activeNav === 'helpdesk' && (
          <div className="grid lg:grid-cols-2 gap-6 text-xs">
            <form onSubmit={handleOpenTicket} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">1. Open New Support Ticket</h2>
              <input
                type="email"
                required
                placeholder="Your Email Address *"
                value={newTicketEmail}
                onChange={e => setNewTicketEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
              />
              <input
                type="text"
                required
                placeholder="Subject *"
                value={newTicketSubject}
                onChange={e => setNewTicketSubject(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
              />
              <textarea
                rows={3}
                required
                placeholder="Message *"
                value={newTicketMsg}
                onChange={e => setNewTicketMsg(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
              />
              {ticketSubmitMsg && <p className="text-emerald-400 font-bold">{ticketSubmitMsg}</p>}
              <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-600 text-white font-bold">
                Submit Ticket
              </button>
            </form>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-lg font-bold text-white">2. My Support Inbox & Replies</h2>
              <form onSubmit={handleSearchInbox} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your Email or Ticket ID (e.g. TCK-1001)"
                  value={inboxQuery}
                  onChange={e => setInboxQuery(e.target.value)}
                  className="flex-1 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                <button type="submit" className="px-4 py-2 rounded-lg bg-cyan-600 text-white font-bold">Search</button>
              </form>

              {inboxTicket && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-cyan-400">{inboxTicket.id} — {inboxTicket.subject}</span>
                    <span className="text-emerald-400 font-bold">{inboxTicket.status}</span>
                  </div>
                  <div className="space-y-2">
                    {inboxTicket.thread.map((m, i) => (
                      <div key={i} className={`p-2.5 rounded-lg ${m.sender === 'support' ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-200' : 'bg-slate-900 text-slate-300'}`}>
                        <div className="text-[10px] font-bold uppercase">{m.sender} • {m.time}</div>
                        <div>{m.text}</div>
                      </div>
                    ))}
                  </div>
                  {!inboxTicket.receiptConfirmed ? (
                    <button
                      onClick={() => handleConfirmReceipt(inboxTicket.id)}
                      className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold"
                    >
                      ✓ Confirm Reply Received
                    </button>
                  ) : (
                    <span className="inline-block text-emerald-400 font-bold">✓ Receipt Confirmed</span>
                  )}
                  <form onSubmit={handleSendFollowup} className="flex gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      placeholder="Write a follow-up message..."
                      value={followupText}
                      onChange={e => setFollowupText(e.target.value)}
                      className="flex-1 p-2 rounded bg-slate-900 border border-slate-800 text-white"
                    />
                    <button type="submit" className="px-3 py-1.5 rounded bg-cyan-600 text-white font-bold">Send</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MASTER ADMIN CONSOLE */}
        {activeNav === 'admin' && (
          <div className="space-y-6 text-xs">
            {!isOwner && currentUser?.role !== 'support' ? (
              <div className="p-10 rounded-2xl bg-slate-900 border border-rose-800 text-center space-y-3">
                <Lock className="w-8 h-8 text-rose-400 mx-auto" />
                <h2 className="text-lg font-bold text-white">Restricted Master Control Center</h2>
                <p className="text-slate-400">Sign in with your SHA-256 Master Owner or Support credentials.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setAdminTab('1')} className={`px-3.5 py-2 rounded-lg font-bold ${adminTab === '1' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}>
                      1. Evaluators & CVs ({applicants.length})
                    </button>
                    <button onClick={() => setAdminTab('2')} className={`px-3.5 py-2 rounded-lg font-bold ${adminTab === '2' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}>
                      2. Helpdesk Tickets ({tickets.length})
                    </button>
                    <button onClick={() => setAdminTab('3')} className={`px-3.5 py-2 rounded-lg font-bold ${adminTab === '3' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}>
                      3. Split-Vault Accounts, Ban & Resets ({users.length})
                    </button>
                    {isOwner && (
                      <button onClick={() => setAdminTab('5')} className={`px-3.5 py-2 rounded-lg font-bold ${adminTab === '5' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-300'}`}>
                        5. Stealth Brand Config
                      </button>
                    )}
                  </div>

                  {isOwner && (
                    <button
                      onClick={handleExportVaultFiles}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Export Vault Files (JS)
                    </button>
                  )}
                </div>

                {adminTab === '1' && (
                  <div className="space-y-3">
                    {applicants.map(app => (
                      <div key={app.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap justify-between items-center gap-3">
                        <div>
                          <div className="font-bold text-white text-sm">{app.name} ({app.email})</div>
                          <div className="text-slate-400">{app.dialect} • CV: {app.cvFile} • Status: <strong className="text-emerald-400">{app.status}</strong></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {app.cvDataUrl && (
                            <a href={app.cvDataUrl} download={app.cvFile} className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 font-bold">
                              📄 Download CV
                            </a>
                          )}
                          <button onClick={() => handleCertifyApplicant(app)} className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold">
                            ✓ Certify & Unlock Projects
                          </button>
                          <button onClick={() => handleDeleteApplicant(app.id)} className="px-3 py-1.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
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
                      <div key={t.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-cyan-400">{t.id} — {t.subject} ({t.senderEmail})</span>
                          <div className="flex items-center gap-2">
                            {t.receiptConfirmed && <span className="text-emerald-400 font-bold">✓ Receipt Confirmed</span>}
                            <button onClick={() => handleDeleteTicket(t.id)} className="text-rose-400 font-bold">Delete</button>
                          </div>
                        </div>
                        <div className="space-y-1.5 pl-3 border-l-2 border-slate-700">
                          {t.thread.map((m, idx) => (
                            <div key={idx} className="text-slate-300">
                              <strong className={m.sender === 'support' ? 'text-emerald-400' : 'text-cyan-400'}>{m.sender.toUpperCase()}:</strong> {m.text}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Reply to ${t.senderEmail}...`}
                            value={replyDrafts[t.id] || ''}
                            onChange={e => setReplyDrafts({ ...replyDrafts, [t.id]: e.target.value })}
                            className="flex-1 p-2 rounded bg-slate-950 border border-slate-800 text-white"
                          />
                          <button onClick={() => handleAdminReplyTicket(t.id)} className="px-4 py-2 rounded bg-emerald-600 text-white font-bold">
                            Send Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {adminTab === '3' && (
                  <div className="grid lg:grid-cols-3 gap-6">
                    <form onSubmit={handleProvisionUser} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <h3 className="font-bold text-white text-sm">Provision Account into SHA-256 Vault</h3>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={provEmail}
                        onChange={e => setProvEmail(e.target.value)}
                        className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Initial Password"
                        value={provPass}
                        onChange={e => setProvPass(e.target.value)}
                        className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                      />
                      <select
                        value={provRole}
                        onChange={e => setProvRole(e.target.value)}
                        className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                      >
                        <option value="evaluator">Evaluator</option>
                        <option value="support">Support / Helpdesk</option>
                        <option value="client">Enterprise Client</option>
                      </select>
                      {provMsg && <p className="text-emerald-400 font-bold">{provMsg}</p>}
                      <button type="submit" className="w-full py-2.5 rounded bg-cyan-600 text-white font-bold">
                        + Encrypt & Activate
                      </button>
                    </form>

                    <div className="lg:col-span-2 space-y-3">
                      {users.map(u => (
                        <div key={u.keyId || u.email} className={`p-4 rounded-xl border space-y-2 ${u.isBanned ? 'bg-rose-950/30 border-rose-700' : 'bg-slate-900 border-slate-800'}`}>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-bold text-white">{u.name}</span>
                              <span className="text-slate-400 ml-2">({u.email})</span>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-mono uppercase">{u.role}</span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 truncate">
                            Vault Key: {u.keyId} → SHA-256: {securityVault[u.keyId]?.slice(0, 28)}...
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button onClick={() => handleToggleProjectAccess(u.email)} className="px-3 py-1 rounded bg-slate-800 text-emerald-400 font-bold">
                              {u.certifiedForProjects ? '✓ Projects Unlocked' : '🔒 Projects Locked'}
                            </button>
                            <button onClick={() => handleAdminDispatchResetLink(u)} className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold">
                              🔑 Dispatch Reset Link
                            </button>
                            {isOwner && (
                              <button
                                onClick={() => handleToggleBanUser(u.email)}
                                className={`px-3 py-1 rounded font-extrabold ${u.isBanned ? 'bg-emerald-500 text-slate-950' : 'bg-rose-600 text-white'}`}
                              >
                                {u.isBanned ? '✓ Unban User' : '🚫 Ban User'}
                              </button>
                            )}
                            {isOwner && (
                              <button onClick={() => handleDeleteUser(u.email)} className="px-3 py-1 rounded bg-slate-800 text-rose-400 font-bold">
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
                  <form onSubmit={handleSaveBrandConfig} className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 max-w-lg">
                    <h3 className="font-bold text-white text-sm">Stealth Brand Configuration</h3>
                    <input
                      type="text"
                      value={editBrand.brandName}
                      onChange={e => setEditBrand({ ...editBrand, brandName: e.target.value })}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                    />
                    <input
                      type="text"
                      value={editBrand.brandStatus}
                      onChange={e => setEditBrand({ ...editBrand, brandStatus: e.target.value })}
                      className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                    />
                    <button type="submit" className="px-5 py-2.5 rounded bg-cyan-600 text-white font-bold">
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Zero-Trust Split-Vault Authentication</h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400">✕</button>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg">
              <button onClick={() => setAuthTab('signin')} className={`py-1.5 rounded font-bold ${authTab === 'signin' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>Sign In</button>
              <button onClick={() => setAuthTab('signup')} className={`py-1.5 rounded font-bold ${authTab === 'signup' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>Register</button>
              <button onClick={() => setAuthTab('forgot')} className={`py-1.5 rounded font-bold ${authTab === 'forgot' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>Forgot Pass</button>
            </div>

            {authTab === 'signin' && (
              <form onSubmit={handleSignIn} autoComplete="off" className="space-y-3">
                <input
                  type="email"
                  required
                  autoComplete="new-password"
                  placeholder="Email Address *"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Password *"
                  value={authPass}
                  onChange={e => setAuthPass(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                {authMsg && <p className="text-rose-400 font-bold">{authMsg}</p>}
                <button type="submit" className="w-full py-2.5 rounded-lg bg-cyan-600 text-white font-bold">
                  Sign In (SHA-256 Verify)
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
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                <input
                  type="password"
                  required
                  placeholder="Password *"
                  value={authPass}
                  onChange={e => setAuthPass(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                <select
                  value={authSecQ}
                  onChange={e => setAuthSecQ(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                >
                  {SECURITY_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <input
                  type="text"
                  required
                  placeholder="Security Answer *"
                  value={authSecA}
                  onChange={e => setAuthSecA(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-white"
                />
                {authMsg && <p className="text-rose-400 font-bold">{authMsg}</p>}
                <button type="submit" className="w-full py-2.5 rounded-lg bg-cyan-600 text-white font-bold">
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
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Security Question Answer *"
                    value={resetFlowSecA}
                    onChange={e => setResetFlowSecA(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                  />
                  <input
                    type="password"
                    required
                    placeholder="New Password (min 6 chars) *"
                    value={resetFlowNewPass}
                    onChange={e => setResetFlowNewPass(e.target.value)}
                    className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-white"
                  />
                  {resetFlowMsg && <p className="text-emerald-400 font-bold">{resetFlowMsg}</p>}
                  <button type="submit" className="w-full py-2 rounded bg-cyan-600 text-white font-bold">
                    Verify Security Answer & Reset
                  </button>
                </form>
                <button
                  type="button"
                  onClick={handleRequestResetLink}
                  className="w-full py-2 rounded bg-slate-800 text-amber-400 border border-slate-700 font-bold"
                >
                  Request Reset Link from Helpdesk / Owner
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {brand.brandName} ({brand.brandStatus}) — Split-Vault SHA-256 Security Architecture
      </footer>
    </div>
  );
}
