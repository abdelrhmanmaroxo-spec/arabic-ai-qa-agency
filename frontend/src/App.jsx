import React, { useState, useEffect } from 'react';
import { 
  Shield, CheckCircle, Lock, Cpu, Server, FileText, AlertTriangle, Users, Send, 
  RefreshCw, Eye, EyeOff, Key, HelpCircle, Terminal, Check, X, Briefcase, 
  ChevronRight, Download, MessageSquare, UserCheck, Trash2, Edit3, Layers, 
  Globe, Mail, Clock, Database, BarChart2, ShieldCheck, Search, ExternalLink, 
  Settings, Play, CheckSquare, FileCheck, LogOut, User, Paperclip
} from 'lucide-react';
import { SECURITY_QUESTIONS, INITIAL_ACCOUNTS_REGISTRY } from './accountsRegistry';
import { MASTER_OWNER_VAULT_DIGEST, INITIAL_SECURITY_VAULT, computeVaultDigest } from './securityVault';

const INITIAL_PLATFORM_CONFIG = {
  brandName: 'STEALTH AI QA',
  brandStatus: 'Pre-Launch Stealth Mode',
  tagline: 'Sovereign Arabic AI & Multimodal LLM Quality Assurance Agency',
  regionBadge: 'MENA & Sovereign AI Nodes',
  leadArchitect: 'Abdelrhman Maroxo',
  leadTitle: 'Founding AI QA Architect'
};

const MASTER_CONTRACT_ARTICLES = [
  { id: "1.1", title: "Confidentiality & Non-Disclosure Scope", content: "All datasets, audio files, guidelines, and evaluation work are strictly classified." },
  { id: "1.2", title: "Strict Zero-AI Policy & Authenticity Guarantee", content: "Evaluators MUST NOT use external LLMs or automated tools for scoring." },
  { id: "1.3", title: "Data Handling & Storage Restrictions", content: "No downloading, screenshots, or local caching of customer voice data." },
  { id: "1.4", title: "Intellectual Property Ownership", content: "All annotations, transcriptions, and evaluations remain exclusive agency IP." },
  { id: "1.5", title: "Quality Assurance & SLA Compliance", content: "Outputs are subjected to multi-tiered L1/L2 audit verification." },
  { id: "1.6", title: "Anti-Cheat & Telemetry Auditing", content: "The platform logs focus shifts, copy-paste attempts, and timing telemetry." },
  { id: "1.7", title: "Independent Contractor Status", content: "Evaluators operate as certified independent evaluators." },
  { id: "1.8", title: "Conflict of Interest Avoidance", content: "Evaluators must disclose any concurrent employment with client AI labs." },
  { id: "1.9", title: "Compensation & Payout Terms", content: "Payouts are disbursed upon client verification and audit pass." },
  { id: "1.10", title: "Termination & Breach Remedies", content: "Any breach of Zero-AI policy or NDA results in instant termination." },
  { id: "1.11", title: "Jurisdiction & Governing Law", content: "This contract is governed under applicable international AI governance laws." },
  { id: "1.12", title: "Term Duration & Survival Clauses", content: "Confidentiality obligations survive for 5 years post-engagement." }
];

const PLATFORM_PROJECTS = [
  { id: "PRJ-TRN-101", name: "Audio Transcription & Diarization", desc: "Egyptian & Gulf Banking Call-Center Verbatim QA", status: "Active" },
  { id: "PRJ-ANN-204", name: "Data Annotation & Semantic Labeling", desc: "Multimodal Document OCR, Receipt & Financial Extraction", status: "Active" },
  { id: "PRJ-S2S-309", name: "Speech-to-Speech (S2S) Calibration", desc: "Real-time voice agent pitch, tone, emotion & latency QA", status: "Active" },
  { id: "PRJ-FPA-412", name: "Financial Modeling & FP&A Audit", desc: "Audit complex Arabic/English balance sheets and formulas", status: "Active" },
  { id: "PRJ-RLH-518", name: "RLHF & Adversarial Red-Teaming", desc: "Safety alignment, jailbreak prompt injection & refusal QA", status: "Active" }
];

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('arabic_ai_qa_users');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS_REGISTRY;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('arabic_ai_qa_applications');
    return saved ? JSON.parse(saved) : [];
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('arabic_ai_qa_tickets');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('arabic_ai_qa_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('onboarding');
  const [adminSubTab, setAdminSubTab] = useState('evaluators');

  const [onboardForm, setOnboardForm] = useState({
    name: '',
    email: '',
    securityQuestion: SECURITY_QUESTIONS[0],
    securityAnswer: '',
    cvFile: null,
    cvDataUrl: '',
    cvFileName: '',
    ndaAgreed: false
  });

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    securityQuestion: SECURITY_QUESTIONS[0],
    securityAnswer: ''
  });

  const [ticketForm, setTicketForm] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [inboxSearchEmail, setInboxSearchEmail] = useState('');
  const [replyDrafts, setReplyDrafts] = useState({});
  const [followUpDrafts, setFollowUpDrafts] = useState({});
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('arabic_ai_qa_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('arabic_ai_qa_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('arabic_ai_qa_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('arabic_ai_qa_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('arabic_ai_qa_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const match = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (match && match.isCertified !== currentUser.isCertified) {
        setCurrentUser(prev => ({ ...prev, isCertified: match.isCertified }));
      }
    }
  }, [users]);

  const checkOwnerVaultAndProcess = (email, securityAnswer, name = '') => {
    const cleanEmail = email.trim().toLowerCase();
    const digest = computeVaultDigest(cleanEmail, securityAnswer.trim());
    if (digest === MASTER_OWNER_VAULT_DIGEST) {
      setUsers(prev => prev.filter(u => u.email.toLowerCase() !== cleanEmail));
      const ownerUser = {
        id: 'USR-MASTER-OWNER',
        name: name || 'Master Owner',
        email: cleanEmail,
        role: 'owner',
        keyId: 'KEY-MASTER-OWNER',
        isCertified: true
      };
      setCurrentUser(ownerUser);
      setActiveTab('admin');
      setStatusMsg('Master Owner Authenticated via Security Vault Digest!');
      return true;
    }
    return false;
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    const { name, email, securityQuestion, securityAnswer, cvDataUrl, cvFileName, ndaAgreed } = onboardForm;
    if (!name || !email || !securityAnswer) {
      alert('Please complete all required fields.');
      return;
    }
    if (!ndaAgreed) {
      alert('You must agree to all 12 clauses of the Master Service Contract & NDA.');
      return;
    }

    if (checkOwnerVaultAndProcess(email, securityAnswer, name)) {
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const newApp = {
      id: 'APP-' + Math.floor(1000 + Math.random() * 9000),
      name: name.trim(),
      email: cleanEmail,
      securityQuestion,
      cvDataUrl: cvDataUrl || '',
      cvFileName: cvFileName || 'Resume.pdf',
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    setApplications(prev => [newApp, ...prev.filter(a => a.email.toLowerCase() !== cleanEmail)]);

    const newUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: name.trim(),
      email: cleanEmail,
      securityAnswer: securityAnswer.trim(),
      role: 'evaluator',
      isCertified: false,
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev.filter(u => u.email.toLowerCase() !== cleanEmail), newUser]);
    setCurrentUser(newUser);
    setStatusMsg('Onboarding dossier submitted successfully! Project access is locked pending Admin certification.');
    alert('Dossier submitted! You are logged in as Evaluator. Projects remain locked until Admin certifies your dossier.');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const emailClean = signInForm.email.trim().toLowerCase();
    const passClean = signInForm.password.trim();

    if (emailClean === 'support@stealth-ai.agency' && passClean === 'Support2026Pass!') {
      const adminUser = {
        id: 'USR-SUPP-2026',
        name: 'Support Operations',
        email: emailClean,
        role: 'admin',
        isCertified: true
      };
      setCurrentUser(adminUser);
      setActiveTab('admin');
      setStatusMsg('Logged in as Support Operations (Master Admin)');
      return;
    }

    const matched = users.find(u => u.email.toLowerCase() === emailClean);
    if (matched) {
      setCurrentUser(matched);
      setStatusMsg(`Welcome back, ${matched.name}!`);
      if (matched.role === 'admin' || matched.role === 'owner') {
        setActiveTab('admin');
      } else {
        setActiveTab('projects');
      }
    } else {
      alert('Account not found. Please check your credentials or complete onboarding.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, securityQuestion, securityAnswer } = signUpForm;
    if (!email || !securityAnswer) {
      alert('Email and Security Answer are required.');
      return;
    }

    if (checkOwnerVaultAndProcess(email, securityAnswer, name)) {
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const newUser = {
      id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
      name: name.trim() || 'Evaluator',
      email: cleanEmail,
      securityAnswer: securityAnswer.trim(),
      role: 'evaluator',
      isCertified: false,
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev.filter(u => u.email.toLowerCase() !== cleanEmail), newUser]);
    setCurrentUser(newUser);
    setActiveTab('projects');
    setStatusMsg('Signed up successfully!');
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setOnboardForm(prev => ({
        ...prev,
        cvFile: file,
        cvDataUrl: reader.result,
        cvFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const email = ticketForm.email.trim() || (currentUser ? currentUser.email : '');
    if (!email || !ticketForm.subject || !ticketForm.message) {
      alert('Please fill in email, subject, and message.');
      return;
    }

    const newTicket = {
      id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
      email: email.toLowerCase(),
      subject: ticketForm.subject.trim(),
      createdAt: new Date().toISOString(),
      status: 'open',
      viewedBySender: true,
      receiptConfirmed: false,
      thread: [
        {
          id: 'MSG-' + Date.now(),
          sender: 'user',
          senderName: currentUser ? currentUser.name : email,
          message: ticketForm.message.trim(),
          timestamp: new Date().toLocaleString()
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    setTicketForm({ email: '', subject: '', message: '' });
    setStatusMsg(`Ticket ${newTicket.id} created successfully!`);
    alert(`Ticket created! Ticket ID: ${newTicket.id}`);
  };

  const handleAdminSendReply = (ticketId) => {
    const text = replyDrafts[ticketId];
    if (!text || !text.trim()) return;

    const replyMsg = {
      id: 'MSG-' + Date.now(),
      sender: 'support',
      senderName: 'Support Desk (Master Admin)',
      message: text.trim(),
      timestamp: new Date().toLocaleString()
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'replied',
          viewedBySender: false,
          thread: [...t.thread, replyMsg]
        };
      }
      return t;
    }));

    setReplyDrafts(prev => ({ ...prev, [ticketId]: '' }));
    setStatusMsg(`Reply sent for Ticket ${ticketId}`);
  };

  const handleUserSendFollowUp = (ticketId) => {
    const text = followUpDrafts[ticketId];
    if (!text || !text.trim()) return;

    const msg = {
      id: 'MSG-' + Date.now(),
      sender: 'user',
      senderName: currentUser ? currentUser.name : 'User',
      message: text.trim(),
      timestamp: new Date().toLocaleString()
    };

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'open',
          thread: [...t.thread, msg]
        };
      }
      return t;
    }));

    setFollowUpDrafts(prev => ({ ...prev, [ticketId]: '' }));
  };

  const handleConfirmReplyReceived = (ticketId) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          viewedBySender: true,
          receiptConfirmed: true
        };
      }
      return t;
    }));
    setStatusMsg(`Confirmed receipt for ticket ${ticketId}`);
  };

  const handleCertifyEvaluator = (email) => {
    const cleanEmail = email.toLowerCase();
    setUsers(prev => prev.map(u => u.email.toLowerCase() === cleanEmail ? { ...u, isCertified: true } : u));
    setApplications(prev => prev.map(a => a.email.toLowerCase() === cleanEmail ? { ...a, status: 'certified' } : a));
    if (currentUser && currentUser.email.toLowerCase() === cleanEmail) {
      setCurrentUser(prev => ({ ...prev, isCertified: true }));
    }
    setStatusMsg(`Certified & Unlocked projects for ${cleanEmail}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('onboarding');
    setStatusMsg('Signed out.');
  };

  const isUserCertified = currentUser && (
    currentUser.role === 'admin' || 
    currentUser.role === 'owner' || 
    currentUser.isCertified || 
    users.some(u => u.email.toLowerCase() === currentUser.email.toLowerCase() && u.isCertified)
  );

  const userVisibleTickets = tickets.filter(t => {
    if (currentUser && currentUser.email) {
      if (t.email.toLowerCase() === currentUser.email.toLowerCase()) return true;
    }
    if (inboxSearchEmail.trim()) {
      const q = inboxSearchEmail.trim().toLowerCase();
      return t.email.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-indigo-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {INITIAL_PLATFORM_CONFIG.brandName}
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {INITIAL_PLATFORM_CONFIG.brandStatus}
              </span>
            </h1>
            <p className="text-xs text-slate-400">{INITIAL_PLATFORM_CONFIG.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs">
              <User className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="font-semibold text-slate-200">{currentUser.name}</span>
                <span className="text-slate-400 ml-1">({currentUser.email})</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`px-1.5 py-0.2 rounded font-mono ${
                    currentUser.role === 'owner' ? 'bg-amber-500/20 text-amber-300' :
                    currentUser.role === 'admin' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {currentUser.role?.toUpperCase()}
                  </span>
                  {isUserCertified ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3 h-3" /> Certified
                    </span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1 font-medium">
                      <Lock className="w-3 h-3" /> Pending QA
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-2 p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('sign-in')}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-3 py-2 rounded-lg transition flex items-center gap-1.5"
            >
              <Key className="w-4 h-4" /> Workspace Sign-In
            </button>
          )}
        </div>
      </header>

      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('onboarding')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            activeTab === 'onboarding' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" /> Evaluator Onboarding & NDA
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            activeTab === 'projects' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Projects {isUserCertified ? '(Unlocked)' : '(Locked)'}
        </button>

        <button
          onClick={() => setActiveTab('helpdesk')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            activeTab === 'helpdesk' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Helpdesk Inbox
        </button>

        <button
          onClick={() => setActiveTab('sign-in')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
            activeTab === 'sign-in' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" /> Sign In
        </button>

        {(currentUser?.role === 'admin' || currentUser?.role === 'owner') && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
              activeTab === 'admin' ? 'bg-purple-600 text-white' : 'text-purple-400 hover:text-white hover:bg-purple-900/30'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Master Admin
          </button>
        )}
      </nav>

      {statusMsg && (
        <div className="bg-indigo-950/80 border-b border-indigo-800/50 px-6 py-2 text-xs text-indigo-300 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" /> {statusMsg}
          </span>
          <button onClick={() => setStatusMsg('')} className="text-slate-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'onboarding' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Evaluator Onboarding & NDA Registration
              </h2>
              <p className="text-sm text-slate-400 mb-6">
                Complete your details, attach your CV, set your security vault answer, and execute the 12-clause Master Service Contract.
              </p>

              <form onSubmit={handleOnboardingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={onboardForm.name}
                      onChange={e => setOnboardForm({ ...onboardForm, name: e.target.value })}
                      placeholder="e.g. Omar Test"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={onboardForm.email}
                      onChange={e => setOnboardForm({ ...onboardForm, email: e.target.value })}
                      placeholder="e.g. omar.qa@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Security Question *</label>
                    <select
                      value={onboardForm.securityQuestion}
                      onChange={e => setOnboardForm({ ...onboardForm, securityQuestion: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {SECURITY_QUESTIONS.map((q, idx) => (
                        <option key={idx} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Security Vault Answer *</label>
                    <input
                      type="text"
                      required
                      value={onboardForm.securityAnswer}
                      onChange={e => setOnboardForm({ ...onboardForm, securityAnswer: e.target.value })}
                      placeholder="Enter security answer"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-indigo-400" /> Upload Resume / CV (PDF or Doc)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                    className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                  />
                  {onboardForm.cvFileName && (
                    <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Attached: {onboardForm.cvFileName}
                    </p>
                  )}
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-400" /> Master Service Contract & 12-Clause NDA
                  </h3>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-2 text-xs text-slate-400 scrollbar-thin">
                    {MASTER_CONTRACT_ARTICLES.map(art => (
                      <div key={art.id} className="border-b border-slate-800/60 pb-2">
                        <span className="font-semibold text-slate-300">{art.id} {art.title}:</span> {art.content}
                      </div>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 pt-2 text-xs font-medium text-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onboardForm.ndaAgreed}
                      onChange={e => setOnboardForm({ ...onboardForm, ndaAgreed: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
                    />
                    I hereby agree to all 12 clauses of the Master Service Contract & NDA Agreement.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" /> Submit Dossier & Register Evaluator
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-400" /> Agency Workbench Projects
                  </h2>
                  <p className="text-sm text-slate-400">
                    Sovereign Arabic AI & Multimodal LLM Quality Evaluation Tasks
                  </p>
                </div>

                {isUserCertified ? (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Projects Unlocked — Certified Access
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> Projects Queue Locked — 0 Tasks Assigned
                  </span>
                )}
              </div>

              {!isUserCertified ? (
                <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto text-amber-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-300">Projects Queue Locked — 0 Tasks Assigned</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Your account is registered but requires Admin certification of your CV and NDA dossier before production tasks are assigned.
                  </p>
                  <div className="pt-2 flex justify-center gap-4 text-xs">
                    <button onClick={() => setActiveTab('helpdesk')} className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition">
                      Contact Helpdesk for Certification
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Workbench Sandbox Active:</strong> You are authorized to accept evaluation assignments across active agency nodes.</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PLATFORM_PROJECTS.map(prj => (
                      <div key={prj.id} className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-indigo-400">{prj.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {prj.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-base">{prj.name}</h4>
                        <p className="text-xs text-slate-400">{prj.desc}</p>
                        <button 
                          onClick={() => alert(`Launching workbench environment for ${prj.id}...`)}
                          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5" /> Launch Task Workbench
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'helpdesk' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> Open Helpdesk Ticket
                </h2>

                <form onSubmit={handleCreateTicket} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={ticketForm.email || (currentUser?.email || '')}
                      onChange={e => setTicketForm({ ...ticketForm, email: e.target.value })}
                      placeholder="e.g. omar.qa@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={ticketForm.subject}
                      onChange={e => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder="e.g. Certification & Project Queue Request"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={ticketForm.message}
                      onChange={e => setTicketForm({ ...ticketForm, message: e.target.value })}
                      placeholder="Describe your query or request..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Ticket
                  </button>
                </form>
              </div>

              <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-400" /> Helpdesk Inbox & Support Replies
                  </h2>
                  {currentUser && (
                    <span className="text-xs text-slate-400">
                      Showing tickets for <strong>{currentUser.email}</strong>
                    </span>
                  )}
                </div>

                {!currentUser && (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={inboxSearchEmail}
                      onChange={e => setInboxSearchEmail(e.target.value)}
                      placeholder="Enter email or Ticket ID (e.g. omar.qa@example.com)"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {userVisibleTickets.length === 0 ? (
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-8 text-center text-xs text-slate-500">
                    No helpdesk tickets found. Submit a ticket on the left or search by email.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userVisibleTickets.map(t => (
                      <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-400">{t.id}</span>
                            <span className="text-xs font-semibold text-white">{t.subject}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {t.receiptConfirmed ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                ✓ Receipt Confirmed
                              </span>
                            ) : t.status === 'replied' ? (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                                Reply Received
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                Pending Support
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                          {t.thread?.map((msg, idx) => (
                            <div 
                              key={msg.id || idx}
                              className={`p-3 rounded-lg text-xs space-y-1 ${
                                msg.sender === 'support' 
                                  ? 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 ml-4' 
                                  : 'bg-slate-900 border border-slate-800 text-slate-300 mr-4'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                                <span>{msg.senderName || msg.sender}</span>
                                <span>{msg.timestamp}</span>
                              </div>
                              <p className="whitespace-pre-wrap">{msg.message}</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
                          {t.status === 'replied' && !t.receiptConfirmed && (
                            <button
                              onClick={() => handleConfirmReplyReceived(t.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-1.5 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5 w-full"
                            >
                              <Check className="w-3.5 h-3.5" /> ✓ Confirm Reply Received
                            </button>
                          )}

                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={followUpDrafts[t.id] || ''}
                              onChange={e => setFollowUpDrafts({ ...followUpDrafts, [t.id]: e.target.value })}
                              placeholder="Follow-up message..."
                              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                            />
                            <button
                              onClick={() => handleUserSendFollowUp(t.id)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sign-in' && (
          <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Key className="w-5 h-5 text-indigo-400" /> Workspace Sign-In
              </h2>
              <p className="text-xs text-slate-400">Access your Evaluator, Admin, or Owner workbench</p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={signInForm.email}
                  onChange={e => setSignInForm({ ...signInForm, email: e.target.value })}
                  placeholder="e.g. omar.qa@example.com or support@stealth-ai.agency"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password or Vault Answer</label>
                <input
                  type="password"
                  required
                  value={signInForm.password}
                  onChange={e => setSignInForm({ ...signInForm, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-3 rounded-lg text-xs transition"
              >
                Sign In
              </button>
            </form>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="text-xs font-semibold text-slate-300 mb-2">New Evaluator Registration</h3>
              <form onSubmit={handleSignUp} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={signUpForm.name}
                  onChange={e => setSignUpForm({ ...signUpForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={signUpForm.email}
                  onChange={e => setSignUpForm({ ...signUpForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Security Vault Answer"
                  value={signUpForm.securityAnswer}
                  onChange={e => setSignUpForm({ ...signUpForm, securityAnswer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-xs font-medium transition"
                >
                  Quick Sign Up
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (currentUser?.role === 'admin' || currentUser?.role === 'owner') && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-purple-800/40 rounded-xl p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-400" /> Master Admin Workbench
                  </h2>
                  <p className="text-xs text-slate-400">Manage Evaluator Certification, CV Review & Helpdesk Tickets</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdminSubTab('evaluators')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      adminSubTab === 'evaluators' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    1. Evaluators & CVs
                  </button>
                  <button
                    onClick={() => setAdminSubTab('tickets')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      adminSubTab === 'tickets' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    2. Helpdesk Tickets
                  </button>
                </div>
              </div>

              {adminSubTab === 'evaluators' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200">Registered Evaluator Dossiers</h3>

                  {applications.length === 0 && users.filter(u => u.role === 'evaluator').length === 0 ? (
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 text-center text-xs text-slate-500">
                      No evaluator applications submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {applications.map(app => {
                        const userMatch = users.find(u => u.email.toLowerCase() === app.email.toLowerCase());
                        const isCert = userMatch ? userMatch.isCertified : app.status === 'certified';

                        return (
                          <div key={app.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{app.name}</span>
                                <span className="text-xs text-indigo-400">({app.email})</span>
                              </div>
                              <p className="text-xs text-slate-400">Submitted: {new Date(app.submittedAt).toLocaleString()}</p>
                            </div>

                            <div className="flex items-center gap-3">
                              {app.cvDataUrl ? (
                                <a
                                  href={app.cvDataUrl}
                                  download={app.cvFileName || 'CV.pdf'}
                                  className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
                                >
                                  <Download className="w-3.5 h-3.5" /> Download CV ({app.cvFileName || 'Resume.pdf'})
                                </a>
                              ) : (
                                <span className="text-xs text-slate-500 italic">No CV file attached</span>
                              )}

                              {isCert ? (
                                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Certified
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleCertifyEvaluator(app.email)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
                                >
                                  <Check className="w-3.5 h-3.5" /> ✓ Certify & Unlock Projects
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {adminSubTab === 'tickets' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-200">Active Helpdesk Tickets</h3>

                  {tickets.length === 0 ? (
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 text-center text-xs text-slate-500">
                      No tickets open.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {tickets.map(t => (
                        <div key={t.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-purple-400">{t.id}</span>
                              <span className="text-xs font-semibold text-white">{t.subject}</span>
                              <span className="text-xs text-slate-400">({t.email})</span>
                            </div>

                            <div>
                              {t.receiptConfirmed ? (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                                  ✓ Receipt Confirmed
                                </span>
                              ) : t.viewedBySender ? (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                                  Viewed by Sender
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                                  Pending Review
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                            {t.thread?.map((msg, idx) => (
                              <div 
                                key={msg.id || idx}
                                className={`p-3 rounded-lg text-xs space-y-1 ${
                                  msg.sender === 'support'
                                    ? 'bg-purple-950/40 border border-purple-500/30 text-purple-100 ml-4'
                                    : 'bg-slate-900 border border-slate-800 text-slate-300 mr-4'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                                  <span>{msg.senderName || msg.sender}</span>
                                  <span>{msg.timestamp}</span>
                                </div>
                                <p className="whitespace-pre-wrap">{msg.message}</p>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-slate-800 space-y-2">
                            <textarea
                              rows={2}
                              value={replyDrafts[t.id] || ''}
                              onChange={e => setReplyDrafts({ ...replyDrafts, [t.id]: e.target.value })}
                              placeholder="Type official support reply..."
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                            <button
                              onClick={() => handleAdminSendReply(t.id)}
                              className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-1.5 px-4 rounded-lg text-xs transition flex items-center gap-1.5"
                            >
                              <Send className="w-3.5 h-3.5" /> Send Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
