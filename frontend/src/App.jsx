import React, { useState, useEffect } from 'react';
import {
  Shield, CheckCircle, Lock, Cpu, Server, FileText, AlertTriangle, Users,
  Send, RefreshCw, Eye, EyeOff, Key, HelpCircle, Terminal, Check, X,
  Briefcase, ChevronRight, Download, MessageSquare, UserCheck, Trash2,
  Edit3, Layers, Globe, Mail, Clock, Database, BarChart2, ShieldCheck,
  Search, ExternalLink, Settings, Play, CheckSquare, FileCheck
} from 'lucide-react';

const INITIAL_PLATFORM_CONFIG = {
  brandName: 'STEALTH AI QA',
  brandStatus: 'Pre-Launch Stealth Mode',
  tagline: 'Sovereign Arabic AI & Multimodal LLM Quality Assurance Agency',
  regionBadge: 'MENA & Sovereign AI Nodes',
  leadArchitect: 'Abdelrhman Maroxo',
  leadTitle: 'Founding AI QA Architect'
};

const SECURITY_QUESTIONS = [
  "What was the name of your first school?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was your first pet's name?",
  "What is your favorite book title?"
];export default function App() {
  const [brand, setBrand] = useState(() => {
    const saved = localStorage.getItem('platform_config');
    return saved ? JSON.parse(saved) : INITIAL_PLATFORM_CONFIG;
  });

  const [activeNav, setActiveNav] = useState('home');

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('registered_users');
    if (saved) return JSON.parse(saved);
    return [
      {
        email: 'abdelrhman.maroxo@gmail.com',
        pass: 'ArabEval#Owner2026!',
        role: 'owner',
        name: 'Abdelrhman Maroxo',
        certifiedForProjects: true,
        secQuestion: "What city were you born in?",
        secAnswer: "Alexandria",
        status: 'ACTIVE'
      },
      {
        email: 'support@stealth-ai.agency',
        pass: 'Support2026Pass!',
        role: 'support',
        name: 'Technical Support Lead',
        certifiedForProjects: true,
        secQuestion: "What is your favorite book title?",
        secAnswer: "Clean Code",
        status: 'ACTIVE'
      }
    ];
  });

  const [applicants, setApplicants] = useState(() => {
    const saved = localStorage.getItem('evaluator_applicants');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'APP-901',
        name: 'Sami Al-Mansoor',
        email: 'sami.evaluator@example.com',
        dialect: 'Gulf / Saudi Banking',
        cvFile: 'Sami_CV_Acoustics.pdf',
        secQuestion: 'What city were you born in?',
        secAnswer: 'Riyadh',
        status: 'PENDING',
        appliedAt: '2026-10-29'
      }
    ];
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('support_tickets');
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
    const saved = localStorage.getItem('poc_requests');
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
    const saved = localStorage.getItem('password_resets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('platform_config', JSON.stringify(brand));
  }, [brand]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('registered_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('evaluator_applicants', JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem('support_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('poc_requests', JSON.stringify(pocs));
  }, [pocs]);

  useEffect(() => {
    localStorage.setItem('password_resets', JSON.stringify(resets));
  }, [resets]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] =   const [appForm, setAppForm] = useState({
    name: '',
    email: '',
    dialect: 'Egyptian & Levant Banking Dialects',
    pass: '',
    secQuestion: SECURITY_QUESTIONS[0],
    secAnswer: '',
    cvFileName: '',
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
  const [adminReplyText, setAdminReplyText] = useState('');
  const [adminTicketFilter, setAdminTicketFilter] = useState('');

  const [provEmail, setProvEmail] = useState('');
  const [provPass, setProvPass] = useState('TempPass2026!');
  const [provRole, setProvRole] = useState('evaluator');
  const [provCertified, setProvCertified] = useState(true);
  const [provMsg, setProvMsg] = useState('');

  const [editBrand, setEditBrand] = useState({ ...brand });

  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-TRN-101');
  const [workbenchTaskIndex, setWorkbenchTaskIndex] = useState(0);

  const handleSignIn = (e) => {
    e.preventDefault();
    setAuthMsg('');
    const found = users.find(u => u.email.toLowerCase() === authEmail.trim().toLowerCase() && u.pass === authPass);
    if (found) {
      if (found.status === 'SUSPENDED') {
        setAuthMsg('Account is suspended. Contact owner/helpdesk.');
        return;
      }
      setCurrentUser(found);
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPass('');
    } else {
      setAuthMsg('Invalid email or password.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setAuthMsg('');
    if (!authEmail || !authPass || !authSecA) {
      setAuthMsg('Please fill all mandatory fields including security question answer.');
      return;
    }
    const exists = users.find(u => u.email.toLowerCase() === authEmail.trim().toLowerCase());
    if (exists) {
      setAuthMsg('An account with this email already exists.');
      return;
    }
    const newUser = {
      email: authEmail.trim(),
      pass: authPass,
      role: 'evaluator',
      name: authEmail.split('@')[0],
      certifiedForProjects: false,
      secQuestion: authSecQ,
      secAnswer: authSecA,
      status: 'ACTIVE'
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setShowAuthModal(false);
    setAuthEmail('');
    setAuthPass('');
    setAuthSecA('');
  };

  const handleInstantReset = (e) => {
    e.preventDefault();
    setResetFlowMsg('');
    const targetUser = users.find(u => u.email.toLowerCase() === resetFlowEmail.trim().toLowerCase());
    if (!targetUser) {
      setResetFlowMsg('No account found with this email.');
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
    setUsers(prev => prev.map(u => u.email.toLowerCase() === targetUser.email.toLowerCase() ? { ...u, pass: resetFlowNewPass } : u));
    setResetFlowMsg('Password reset successfully! You can now sign in with your new password.');
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
      email: resetFlowEmail,
      token: token,
      requestedAt: new Date().toLocaleString(),
      status: 'PENDING'
    };
    setResets(prev => [...prev, newReset]);

    const resetTicket = {
      id: resetId,
      senderEmail: resetFlowEmail,
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

    setResetFlowMsg(`Reset request submitted (${resetId})! Link & token logged for Helpdesk/Owner. Token: ${token}`);
  };

  const handleTokenResetSubmit = (e) => {
    e.preventDefault();
    setResetFlowMsg('');
    const resetReq = resets.find(r => r.email.toLowerCase() === resetFlowEmail.trim().toLowerCase() && r.token === resetTokenInput.trim());
    if (!resetReq) {
      setResetFlowMsg('Invalid reset token or email match.');
      return;
    }
    setUsers(prev => prev.map(u => u.email.toLowerCase() === resetFlowEmail.trim().toLowerCase() ? { ...u, pass: resetFlowNewPass } : u));
    setResets(prev => prev.map(r => r.id === resetReq.id ? { ...r, status: 'COMPLETED' } : r));
    setResetFlowMsg('Password successfully updated via token! Proceed to Sign In.');
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
    setTicketSubmitMsg(`Ticket created successfully! ID: ${tckId}. Search for your email in Inbox & Replies to track responses.`);
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

  const handleCertifyApplicant = (app) => {
    setApplicants(prev => prev.map(a => a.id === app.id ? { ...a, status: 'CERTIFIED' } : a));
    setUsers(prev => {
      const idx = prev.findIndex(u => u.email.toLowerCase() === app.email.toLowerCase());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], certifiedForProjects: true };
        return copy;
      } else {
        return [...prev, {
          email: app.email,
          pass: app.pass || 'EvalPass2026!',
          role: 'evaluator',
          name: app.name,
          certifiedForProjects: true,
          secQuestion: app.secQuestion,
          secAnswer: app.secAnswer,
          status: 'ACTIVE'
        }];
      }
    });
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
    if (!adminReplyText) return;
    const replyEntry = { sender: 'support', text: adminReplyText, time: new Date().toLocaleString() };
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
    setAdminReplyText('');
  };

  const handleProvisionUser = (e) => {
    e.preventDefault();
    if (!provEmail) return;
    const exists = users.find(u => u.email.toLowerCase() === provEmail.trim().toLowerCase());
    if (exists) {
      setProvMsg('Account already exists.');
      return;
    }
    const newU = {
      email: provEmail.trim(),
      pass: provPass,
      role: provRole,
      name: provEmail.split('@')[0],
      certifiedForProjects: provCertified,
      secQuestion: SECURITY_QUESTIONS[0],
      secAnswer: 'DefaultAnswer',
      status: 'ACTIVE'
    };
    setUsers(prev => [...prev, newU]);
    setProvMsg(`Account ${provEmail} created successfully (${provRole})!`);
    setProvEmail('');
  };

  const handleToggleProjectAccess = (email) => {
    setUsers(prev => prev.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, certifiedForProjects: !u.certifiedForProjects } : u));
  };

  const handleAdminDispatchResetLink = (user) => {
    const tempPass = 'Reset#' + Math.floor(100000 + Math.random() * 900000);
    const token = 'TOK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const resetUrl = `${window.location.origin}${window.location.pathname}#reset-email=${encodeURIComponent(user.email)}&token=${token}`;
    
    setUsers(prev => prev.map(u => u.email.toLowerCase() === user.email.toLowerCase() ? { ...u, pass: tempPass } : u));

    const resetTicket = {
      id: 'RST-' + Math.floor(1000 + Math.random() * 9000),
      senderEmail: user.email,
      subject: 'Official Password Reset Link & Temporary Credentials',
      thread: [
        {
          sender: 'support',
          text: `Hello, your password reset link has been generated by Helpdesk/Owner. Temporary Password: ${tempPass}\nDirect Reset URL: ${resetUrl}`,
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
    if (email === 'abdelrhman.maroxo@gmail.com') {
      alert('Cannot delete founding owner account.');
      return;
    }
    setUsers(prev => prev.filter(u => u.email.toLowerCase() !== email.toLowerCase()));
  };

  const handleDeletePoc = (pocId) => {
    setPocs(prev => prev.filter(p => p.id !== pocId));
  };

  const handleSaveBrandConfig = (e) => {
    e.preventDefault();
    setBrand(editBrand);
    alert('Stealth Brand Config updated successfully across the entire platform!');
  };

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (!appForm.name || !appForm.email || !appForm.secAnswer || !appForm.agreedNDA) {
      alert('Please fill all mandatory fields and accept the 12-Article Master Contract NDA.');
      return;
    }
    const appObj = {
      id: 'APP-' + Math.floor(100 + Math.random() * 900),
      name: appForm.name,
      email: appForm.email,
      dialect: appForm.dialect,  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-black">
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
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
            className={`px-3 py-1.5 rounded-md transition ${activeNav === 'apply' || activeNav === 'assessment' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
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
                <span className="text-[10px] text-cyan-400 uppercase tracking-wider">{currentUser.role}</span>
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
              onClick={() => { setShowAuthModal(true); setAuthTab('signin'); }}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Key className="w-3.5 h-3.5" />
              Workspace Sign-In
            </button>
          )}

          <button
            onClick={() => setActiveNav('admin')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1"
            title="Master Control Center"
          >
            <Settings className="w-4 h-4 text-slate-300" />
            <span className="hidden lg:inline">Master Admin</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8">
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
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your request has been routed to the Founding Lead Architect ({brand.leadArchitect}). Our technical team will inspect your prompt distribution and dispatch trial results via Client Portal.
                  </p>
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Evaluation Scope</label>
                    <select
                      value={pocForm.scope}
                      onChange={e => setPocForm({ ...pocForm, scope: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >        {activeNav === 'about' && (
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

              <div className="border-t border-slate-800 pt-6 space-y-4">
                <h3 className="text-lg font-bold text-white">Target Enterprise Client Sectors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-bold text-cyan-400 block mb-1">Sovereign & Frontier LLM Labs</span>
                    <p className="text-slate-400">Regional AI foundations training foundational Arabic LLMs requiring unbiased human RLHF preference ranking.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-bold text-cyan-400 block mb-1">Voice AI & Telecommunications</span>
                    <p className="text-slate-400">Interactive voice response (IVR) and real-time Speech-to-Speech call center agents requiring acoustic latency checks.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-bold text-cyan-400 block mb-1">FinTech, Banking & Enterprise RAG</span>
                    <p className="text-slate-400">Financial institutions requiring verbatim table extraction, balance sheet verification, and document OCR accuracy.</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveNav('client-portal')}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow"
                  >
                    Open Client Portal
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  Your account or session is awaiting manual verification by the Founding Owner (<span className="text-cyan-400 font-mono">abdelrhman.maroxo@gmail.com</span>). Once your onboarding NDA is approved and email is certified, live task workbenches will unlock automatically.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setActiveNav('apply')}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg"
                  >
                    Complete Evaluator Onboarding
                  </button>
                  <button
                    onClick={() => { setShowAuthModal(true); setAuthTab('signin'); }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg"
                  >
                    Sign In with Owner/Certified Account
                  </button>
                </div>
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
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{prj.desc}</p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800 text-[11px]">
                        <span className="text-slate-400">{prj.totalTasks} Tasks Available</span>
                        <span className="font-bold text-emerald-400">{prj.payRate}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 select-none"
                  onCopy={e => e.preventDefault()}
                  onCut={e => e.preventDefault()}
                  onSelectStart={e => e.preventDefault()}
                >
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs text-cyan-400 font-mono font-bold">WORKBENCH SANDBOX</span>
                      <h2 className="text-lg font-bold text-white">
                        {PLATFORM_PROJECTS.find(p => p.id === selectedProjectId)?.name}
                      </h2>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Copy/Paste Restricted
                    </span>
                  </div>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-mono">Task #{workbenchTaskIndex + 1} of 10</span>
                      <span className="text-emerald-400 font-bold">Zero-AI Policy Enforced</span>
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2">
                      <p className="font-semibold text-slate-200">Sample Evaluation Prompt / Context:</p>
                      <p className="text-slate-300 font-mono italic">
                        "قم بمراجعة النص المنقول وصوت المتصل والتأكد من مطابقة المصطلحات المصرفية بدقة 100%"
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Human Annotation Output / Decision</label>
                      <textarea
                        rows={3}
                        placeholder="Type verbatim human evaluation here (Copy-Paste disabled by telemetry sandbox)..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        onClick={() => setWorkbenchTaskIndex(prev => Math.max(0, prev - 1))}
                        disabled={workbenchTaskIndex === 0}
                        className="px-3 py-1.5 rounded bg-slate-800 disabled:opacity-50 text-xs font-bold text-slate-300"
                      >
                        Previous Task
                      </button>
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="md:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-950"
                    >
                      Submit 50-Sample Diagnostic PoC Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        
      cvFile: appForm.cvFileName || 'Uploaded_CV.pdf',
      secQuestion: appForm.secQuestion,
      secAnswer: appForm.secAnswer,
      pass: appForm.pass || 'EvalPass2026!',
      status: 'PENDING',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setApplicants(prev => [appObj, ...prev]);
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

  const isOwner = currentUser?.role === 'owner' || currentUser?.email === 'abdelrhman.maroxo@gmail.com';
  const isCertified = isOwner || currentUser?.certifiedForProjects || currentUser?.role === 'support';
  useState('signin');
  const [forgotSubTab, setForgotSubTab] = useState('question');

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
