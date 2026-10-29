import React, { useState, useEffect } from 'react';

// ============================import React, { useState, useEffect } from 'react';

// ============================================================================
// ARABEVAL QA – ENTERPRISE AI EVALUATION & QUALITY ASSURANCE PLATFORM
// Production Build v3.1 (English-Only LTR, Advanced Live QA Telemetry Matrix,
// Two-Way Support Ticket Tracker, Privacy Protection & Delivery Guarantee)
// ============================================================================

const INITIAL_BRAND = {
  name: 'ArabEval QA',
  tagline: 'Enterprise Arabic & Multimodal AI Evaluation & Quality Assurance',
  badge: 'AR-EG • Gulf (AR-SA/AE) • Levantine • MSA • Multimodal S2S & FP&A',
  founder: 'ArabEval Executive Desk',
  founderTitle: 'Executive Support & AI Quality Management',
};

const CERTIFIED_TRACKS = [
  {
    id: 'arabic-s2s-audio',
    title: 'Arabic Speech-to-Speech (S2S) & Dialect Audio QA',
    rate: '$35 – $75 / hr',
    domain: 'Audio & Multimodal',
    dialect: 'AR-EG / AR-SA / AR-AE / Levantine',
    badge: 'High Demand',
    desc: 'Evaluate native pronunciation, prosody, interruption handling, acoustic naturalness, and regional idioms in real-time conversational AI models.'
  },
  {
    id: 'financial-modeling-fpa',
    title: 'Financial Modeling, FP&A & Arabic FinTech AI Evaluation',
    rate: '$50 – $110 / hr',
    domain: 'Finance & STEM',
    dialect: 'Bilingual (EN / Arabic IFRS & Zakat)',
    badge: 'micro1 Certified Track',
    desc: 'Audit LLM outputs on 3-statement financial modeling, DCF valuation, portfolio risk management, and GCC corporate tax & compliance.'
  },
  {
    id: 'arabic-rlhf-redteaming',
    title: 'Arabic RLHF, Cultural Safety & Red-Teaming',
    rate: '$40 – $90 / hr',
    domain: 'Safety & Alignment',
    dialect: 'All Major Arabic Dialects + MSA',
    badge: 'Core Security',
    desc: 'Stress-test AI agents for regional compliance, hallucination prevention, toxic prompt resistance, and religious/cultural alignment.'
  },
  {
    id: 'code-dev-benchmark',
    title: 'Full-Stack Code QA & Arabic Localization Benchmarks',
    rate: '$45 – $95 / hr',
    domain: 'Software & Code',
    dialect: 'English / Arabic UI-UX Code',
    badge: 'Technical',
    desc: 'Verify code generation accuracy, RTL UI formatting, Arabic tokenization handling, and SQL/Python script generation for enterprise software.'
  }
];

const INITIAL_TICKETS = [
  {
    id: 'TKT-8021',
    subject: 'Audio Disruption on AR-EG Interruption Benchmark',
    email: 'qa.lead@dubai-ai-labs.ae',
    category: 'S2S Audio QA',
    priority: 'High',
    status: 'Resolved & Replied',
    createdAt: '2026-10-28 14:20',
    description: 'Noticeable latency delay (approx 650ms) during speech interruption test on Egyptian dialect dataset.',
    reply: 'Our S2S evaluation team re-calibrated the audio buffer window and optimized the VAD threshold. Latency is now reduced to 180ms.',
    repliedAt: '2026-10-29 09:15',
    repliedBy: 'ArabEval Executive Desk',
    viewedByComplainantAt: '2026-10-29 11:40',
    confirmedByComplainantAt: '2026-10-29 12:00',
    followUpMessage: 'Thank you! The latency issue is fully resolved on our side now.'
  },
  {
    id: 'TKT-8022',
    subject: 'Inquiry regarding GCC Zakat Calculation Evaluation Track',
    email: 'cfo@saudi-fintech-hub.sa',
    category: 'Financial Modeling',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-10-30 08:10',
    description: 'We would like to request custom RLHF dataset validation for Saudi Zakat & Tax authority guidelines.',
    reply: '',
    repliedAt: '',
    repliedBy: '',
    viewedByComplainantAt: null,
    confirmedByComplainantAt: null,
    followUpMessage: ''
  }
];

export default function App() {
  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState('tracks');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportTab, setSupportTab] = useState('submit'); // 'submit' | 'track'

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('arabEval_isAdmin') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tickets State
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('arabEval_tickets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_TICKETS; }
    }
    return INITIAL_TICKETS;
  });

  // User Saved Ticket IDs in LocalStorage
  const [userTicketIds, setUserTicketIds] = useState(() => {
    const saved = localStorage.getItem('arabEval_userTicketIds');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return ['TKT-8021']; }
    }
    return ['TKT-8021'];
  });

  // Ticket Submission Form
  const [newSubject, setNewSubject] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newCategory, setNewCategory] = useState('S2S Audio QA');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDesc, setNewDesc] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  // Public Ticket Lookup
  const [searchTicketId, setSearchTicketId] = useState('');
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [userFollowUpInput, setUserFollowUpInput] = useState('');

  // Admin Helpdesk Search & Filter
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilterStatus, setAdminFilterStatus] = useState('All');
  const [selectedTicketIdForReply, setSelectedTicketIdForReply] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');

  // Save tickets & userTicketIds to localStorage
  useEffect(() => {
    localStorage.setItem('arabEval_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('arabEval_userTicketIds', JSON.stringify(userTicketIds));
  }, [userTicketIds]);

  // Sync tracked ticket if tickets state changes
  useEffect(() => {
    if (trackedTicket) {
      const updated = tickets.find(t => t.id === trackedTicket.id);
      if (updated) setTrackedTicket(updated);
    }
  }, [tickets]);

  // Handle Admin Login
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'abdelrhman.maroxo@gmail.com' && loginPassword === 'ArabEval#Owner2026!') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('arabEval_isAdmin', 'true');
      setShowSignInModal(false);
      setLoginError('');
      setActiveTab('admin');
    } else {
      setLoginError('Invalid credentials. Access restricted to Master Admin.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('arabEval_isAdmin');
    setActiveTab('tracks');
  };

  // Submit Ticket
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newEmail || !newDesc) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `TKT-${randomNum}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTkt = {
      id: generatedId,
      subject: newSubject,
      email: newEmail,
      category: newCategory,
      priority: newPriority,
      status: 'Open',
      createdAt: now,
      description: newDesc,
      reply: '',
      repliedAt: '',
      repliedBy: '',
      viewedByComplainantAt: null,
      confirmedByComplainantAt: null,
      followUpMessage: ''
    };

    setTickets(prev => [newTkt, ...prev]);
    setUserTicketIds(prev => [generatedId, ...prev.filter(id => id !== generatedId)]);
    setSubmitSuccess(`Ticket successfully submitted! Your Ticket ID is: ${generatedId}`);
    setNewSubject('');
    setNewEmail('');
    setNewDesc('');
  };

  // Public Search Ticket & Auto Mark viewedByComplainantAt
  const handleSearchTicket = (e, targetId = null) => {
    if (e) e.preventDefault();
    const idToSearch = (targetId || searchTicketId).trim().toUpperCase();
    if (!idToSearch) return;

    const found = tickets.find(t => t.id.toUpperCase() === idToSearch);
    if (found) {
      setLookupError('');
      const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
      
      // Auto mark viewedByComplainantAt if replied and not viewed yet
      if (found.reply && !found.viewedByComplainantAt) {
        setTickets(prev => prev.map(t => {
          if (t.id === found.id) {
            return { ...t, viewedByComplainantAt: now };
          }
          return t;
        }));
      }
      setTrackedTicket(found);
    } else {
      setTrackedTicket(null);
      setLookupError(`No ticket found matching ID: ${idToSearch}`);
    }
  };

  // Confirm Receipt by Complainant
  const handleConfirmReceipt = (ticketId) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, confirmedByComplainantAt: now };
      }
      return t;
    }));
  };

  // Submit Complainant Follow-up
  const handleAddFollowUp = (ticketId) => {
    if (!userFollowUpInput.trim()) return;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, followUpMessage: userFollowUpInput.trim() };
      }
      return t;
    }));
    setUserFollowUpInput('');
  };

  // Admin Publish Reply
  const handleAdminPublishReply = (ticketId) => {
    if (!adminReplyText.trim()) return;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          reply: adminReplyText,
          repliedAt: now,
          repliedBy: 'ArabEval Executive Desk',
          status: 'Resolved & Replied'
        };
      }
      return t;
    }));

    setSelectedTicketIdForReply(null);
    setAdminReplyText('');
  };

  // Delete Ticket (Admin)
  const handleDeleteTicket = (ticketId) => {
    if (window.confirm(`Are you sure you want to permanently delete ticket ${ticketId}?`)) {
      setTickets(prev => prev.filter(t => t.id !== ticketId));
      setUserTicketIds(prev => prev.filter(id => id !== ticketId));
      if (trackedTicket && trackedTicket.id === ticketId) {
        setTrackedTicket(null);
      }
    }
  };

  // Admin Verify in Public Tracker
  const handleAdminVerifyInTracker = (ticketId) => {
    setSearchTicketId(ticketId);
    setShowSupportModal(true);
    setSupportTab('track');
    handleSearchTicket(null, ticketId);
  };

  // Filtered Tickets for Admin Console
  const filteredAdminTickets = tickets.filter(t => {
    const matchesSearch =
      t.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.subject.toLowerCase().includes(adminSearch.toLowerCase());

    if (adminFilterStatus === 'All') return matchesSearch;
    if (adminFilterStatus === 'Open') return matchesSearch && t.status === 'Open';
    if (adminFilterStatus === 'Resolved & Replied') return matchesSearch && t.status === 'Resolved & Replied';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('tracks')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-500/20">
              AE
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">{INITIAL_BRAND.name}</span>
              <span className="hidden md:inline-block ml-2 px-2 py-0.5 text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/50 rounded-full">
                v3.1 Production
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'tracks' ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Evaluation Tracks
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'telemetry' ? 'bg-slate-800 text-cyan-400 border border-slate-700' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Live Telemetry
            </button>

            <button
              onClick={() => {
                setShowSupportModal(true);
                setSupportTab('submit');
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition flex items-center gap-1.5"
            >
              <span>💬 Support & Tracker</span>
            </button>

            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === 'admin' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-cyan-400 border border-slate-700'
                  }`}
                >
                  ⚡ Master Admin
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="px-2.5 py-2 rounded-lg text-xs font-semibold bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 transition"
                  title="Sign Out"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* HERO BANNER */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
            <span>🌍 Enterprise Arabic AI Safety & Performance Matrix</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Enterprise Arabic & Multimodal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI Quality Assurance</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            High-precision evaluation for Arabic S2S Audio, Financial Modeling, RLHF Red-Teaming, and Regional Dialects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">{INITIAL_BRAND.badge}</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">Official Desk: {INITIAL_BRAND.founder}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: EVALUATION TRACKS */}
        {activeTab === 'tracks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Certified Evaluation Tracks</h2>
                <p className="text-sm text-slate-400">Select an enterprise track to view specialized QA criteria and dialect benchmarks.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFIED_TRACKS.map(track => (
                <div key={track.id} className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition duration-200 flex flex-col justify-between shadow-xl">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        {track.domain}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-800/50">
                        {track.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">{track.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{track.desc}</p>

                    <div className="pt-2 text-xs text-slate-300 space-y-1">
                      <div><strong className="text-slate-500">Dialects / Target:</strong> {track.dialect}</div>
                      <div><strong className="text-slate-500">Standard Comp:</strong> {track.rate}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setShowSupportModal(true);
                        setSupportTab('submit');
                        setNewCategory(track.domain);
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition shadow-md shadow-cyan-600/20"
                    >
                      Request Track Audit
                    </button>
                    <span className="text-xs text-slate-500 font-mono">ID: {track.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE TELEMETRY MATRIX */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Live QA Telemetry & Model Benchmarks</h2>
              <p className="text-sm text-slate-400 mb-6">Real-time dialect latency, financial precision, and red-teaming compliance scores across regional AI deployments.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">Average S2S Latency</div>
                  <div className="text-2xl font-extrabold text-cyan-400">185 ms</div>
                  <div className="text-xs text-emerald-400 mt-1">✓ Within benchmark target (&lt;200ms)</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">FP&A Financial Calculation Accuracy</div>
                  <div className="text-2xl font-extrabold text-emerald-400">99.4%</div>
                  <div className="text-xs text-slate-400 mt-1">Verified against GCC Zakat / IFRS</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
                  <div className="text-xs text-slate-500 mb-1">Red-Teaming Safety Index</div>
                  <div className="text-2xl font-extrabold text-purple-400">98.9%</div>
                  <div className="text-xs text-purple-300 mt-1">Zero high-severity violations</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MASTER ADMIN CONSOLE */}
        {activeTab === 'admin' && isAdminLoggedIn && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span>👑 Master Admin Console</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
                      Executive Level
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Logged in as: <span className="text-slate-200 font-mono">abdelrhman.maroxo@gmail.com</span> | Official Signature: <strong className="text-cyan-400">{INITIAL_BRAND.founder}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="text-emerald-400">● Live System Desk</span>
                </div>
              </div>

              {/* ADMIN HELPDESK SECTION */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>3. Support Helpdesk</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-slate-800 text-slate-300 border border-slate-700">
                      {tickets.length} Total Tickets
                    </span>
                  </h3>

                  {/* ADMIN SEARCH & FILTERS */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search Ticket ID, Email, Subject..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="px-3 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full sm:w-64"
                    />

                    <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs">
                      {['All', 'Open', 'Resolved & Replied'].map(statusOption => (
                        <button
                          key={statusOption}
                          onClick={() => setAdminFilterStatus(statusOption)}
                          className={`px-2.5 py-1 rounded-md font-medium transition ${
                            adminFilterStatus === statusOption ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {statusOption}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* TICKETS LIST IN ADMIN PANEL */}
                <div className="space-y-4 pt-2">
                  {filteredAdminTickets.length === 0 ? (
                    <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-8 text-center text-slate-500 text-sm">
                      No tickets match the search criteria.
                    </div>
                  ) : (
                    filteredAdminTickets.map(tkt => (
                      <div key={tkt.id} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800/60 rounded-md">
                              {tkt.id}
                            </span>
                            <h4 className="font-bold text-white text-base">{tkt.subject}</h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              tkt.status === 'Resolved & Replied'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                                : 'bg-amber-950 text-amber-300 border-amber-800/60'
                            }`}>
                              {tkt.status}
                            </span>

                            {/* DELETE TICKET BUTTON */}
                            <button
                              onClick={() => handleDeleteTicket(tkt.id)}
                              className="px-2.5 py-1 rounded-md text-xs font-semibold bg-red-950/70 hover:bg-red-900 text-red-300 border border-red-800/50 transition"
                              title="Delete Ticket Permanently"
                            >
                              🗑️ Delete Ticket
                            </button>
                          </div>
                        </div>

                        {/* TICKET DETAILS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-400">
                          <div><strong className="text-slate-500">Complainant Email:</strong> {tkt.email}</div>
                          <div><strong className="text-slate-500">Category:</strong> {tkt.category}</div>
                          <div><strong className="text-slate-500">Submitted:</strong> {tkt.createdAt}</div>
                        </div>

                        <div className="bg-slate-900/80 p-3 rounded-lg text-xs text-slate-300 border border-slate-800">
                          <strong className="text-slate-400 block mb-1">Description:</strong>
                          {tkt.description}
                        </div>

                        {/* DELIVERY GUARANTEE & READ RECEIPT BADGE FOR ADMIN */}
                        {tkt.status === 'Resolved & Replied' && (
                          <div className="bg-slate-900/90 p-3.5 rounded-xl border border-cyan-900/40 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                              <span className="text-cyan-400 font-semibold">Official Reply ({tkt.repliedAt}):</span>
                              
                              {/* VERIFY IN TRACKER BUTTON */}
                              <button
                                onClick={() => handleAdminVerifyInTracker(tkt.id)}
                                className="px-2.5 py-1 rounded-md bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 transition text-xs font-semibold"
                              >
                                🔍 Verify in Tracker
                              </button>
                            </div>

                            <p className="text-xs text-slate-200">{tkt.reply}</p>

                            {/* DELIVERY STATUS BADGES */}
                            <div className="pt-2 border-t border-slate-800 text-xs flex flex-wrap items-center gap-2">
                              <span className="text-slate-400 font-medium">Delivery Guarantee Status:</span>
                              {tkt.confirmedByComplainantAt ? (
                                <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-semibold">
                                  ✅ Receipt Confirmed by Complainant at {tkt.confirmedByComplainantAt}
                                </span>
                              ) : tkt.viewedByComplainantAt ? (
                                <span className="px-2.5 py-1 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60 font-semibold">
                                  👁️ Viewed by Complainant at {tkt.viewedByComplainantAt}
                                </span>
                              ) : (
                                <span className="px-2.5 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-800/60 font-semibold">
                                  📤 Published to Portal (Awaiting User View)
                                </span>
                              )}
                            </div>

                            {tkt.followUpMessage && (
                              <div className="mt-2 p-2.5 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200">
                                <strong>Complainant Follow-up:</strong> "{tkt.followUpMessage}"
                              </div>
                            )}
                          </div>
                        )}

                        {/* ADMIN REPLY ACTION / FORM */}
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          {selectedTicketIdForReply === tkt.id ? (
                            <div className="w-full space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                              <label className="block text-xs font-semibold text-slate-300">
                                Write Official Resolution Reply (Signed as {INITIAL_BRAND.founder}):
                              </label>
                              <textarea
                                rows={3}
                                value={adminReplyText}
                                onChange={(e) => setAdminReplyText(e.target.value)}
                                placeholder="Type the official technical resolution details..."
                                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                              />

                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => handleAdminPublishReply(tkt.id)}
                                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md shadow-emerald-600/20"
                                >
                                  Publish Reply to Portal
                                </button>

                                {/* SEND DIRECT EMAIL COPY BUTTON */}
                                <a
                                  href={`mailto:${tkt.email}?subject=${encodeURIComponent(`[ArabEval QA #${tkt.id}] Official Support Resolution`)}&body=${encodeURIComponent(`Dear User,\n\nHere is the official resolution regarding your support ticket #${tkt.id} (${tkt.subject}):\n\n${adminReplyText}\n\nBest regards,\n${INITIAL_BRAND.founder}\nArabEval QA Platform`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 border border-cyan-700/60 transition inline-flex items-center gap-1"
                                >
                                  📧 Send Email Copy to Complainant
                                </a>

                                <button
                                  onClick={() => setSelectedTicketIdForReply(null)}
                                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedTicketIdForReply(tkt.id);
                                setAdminReplyText(tkt.reply || '');
                              }}
                              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition"
                            >
                              {tkt.reply ? '✏️ Edit Reply' : '💬 Respond & Resolve'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>{INITIAL_BRAND.name} — Executive Quality Assurance & Dialect AI Benchmarking Platform</p>
          <p>Managed by {INITIAL_BRAND.founder} • All rights reserved 2026</p>
        </div>
      </footer>

      {/* ============================================================================ */}
      {/* MODAL 1: WORKSPACE SIGN-IN MODAL */}
      {/* ============================================================================ */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            {/* CLEAR CLOSE BUTTON ✕ */}
            <button
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg w-8 h-8 flex items-center justify-center text-base font-bold transition"
              title="Close Modal"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Workspace & Admin Sign-In</h3>
            <p className="text-xs text-slate-400 mb-6">Enter Master Admin credentials to access executive controls.</p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="abdelrhman.maroxo@gmail.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {loginError && (
                <div className="p-3 bg-red-950/60 border border-red-800/50 rounded-xl text-xs text-red-300">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition shadow-lg shadow-cyan-600/20"
              >
                Sign In to Executive Console
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================ */}
      {/* MODAL 2: SUPPORT & TICKET TRACKER MODAL */}
      {/* ============================================================================ */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 relative shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* CLEAR CLOSE BUTTON ✕ */}
            <button
              onClick={() => setShowSupportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg w-8 h-8 flex items-center justify-center text-base font-bold transition z-10"
              title="Close Modal"
            >
              ✕
            </button>

            <div className="mb-4 pr-10">
              <h3 className="text-xl font-bold text-white">Support & Ticket Tracker</h3>
              <p className="text-xs text-slate-400">Submit an inquiry or track your ticket status & official responses in real-time.</p>
            </div>

            {/* MODAL TAB NAVIGATION */}
            <div className="flex border-b border-slate-800 mb-4">
              <button
                onClick={() => setSupportTab('submit')}
                className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
                  supportTab === 'submit' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                1. Submit New Ticket
              </button>
              <button
                onClick={() => setSupportTab('track')}
                className={`pb-3 px-4 text-xs font-bold transition border-b-2 ${
                  supportTab === 'track' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                2. Track Ticket & View Replies
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4">
              {/* SUBMIT TICKET FORM */}
              {supportTab === 'submit' && (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  {submitSuccess && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                      {submitSuccess}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="e.g. S2S Audio Dialect Evaluation Inquiry"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="S2S Audio QA">S2S Audio QA</option>
                        <option value="Financial Modeling">Financial Modeling</option>
                        <option value="RLHF Red-Teaming">RLHF Red-Teaming</option>
                        <option value="Code QA">Code QA</option>
                        <option value="General Support">General Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={4}
                      required
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder="Provide details about your evaluation requirement or inquiry..."
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition shadow-lg shadow-cyan-600/20"
                  >
                    Submit Ticket & Generate ID
                  </button>
                </form>
              )}

              {/* TRACK TICKET TAB */}
              {supportTab === 'track' && (
                <div className="space-y-4">
                  <form onSubmit={(e) => handleSearchTicket(e)} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter Ticket ID (e.g. TKT-8021)"
                      value={searchTicketId}
                      onChange={(e) => setSearchTicketId(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold transition"
                    >
                      Search Ticket
                    </button>
                  </form>

                  {/* SAVED USER TICKET QUICK LIST WITH NOTIFICATION BADGE */}
                  {userTicketIds.length > 0 && (
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2">
                      <div className="text-xs text-slate-400 font-semibold">Your Recent Tickets (Saved in Browser):</div>
                      <div className="flex flex-wrap items-center gap-2">
                        {userTicketIds.map(tId => {
                          const matchingTkt = tickets.find(t => t.id === tId);
                          const isReplied = matchingTkt && matchingTkt.reply;
                          return (
                            <button
                              key={tId}
                              onClick={() => {
                                setSearchTicketId(tId);
                                handleSearchTicket(null, tId);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border flex items-center gap-1.5 transition ${
                                searchTicketId === tId
                                  ? 'bg-cyan-600 text-white border-cyan-500'
                                  : 'bg-slate-900 text-cyan-300 border-slate-800 hover:bg-slate-800'
                              }`}
                            >
                              <span>{tId}</span>
                              {isReplied && (
                                <span className="px-1.5 py-0.2 text-[10px] bg-emerald-500 text-slate-950 rounded-full font-sans font-extrabold" title="Official Reply Received!">
                                  🔔 Reply!
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {lookupError && (
                    <div className="p-3 bg-red-950/60 border border-red-800/50 rounded-xl text-xs text-red-300">
                      {lookupError}
                    </div>
                  )}

                  {/* DISPLAY TRACKED TICKET DETAILS & COMPLAINANT ACTIONS */}
                  {trackedTicket && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div>
                          <span className="font-mono text-xs font-bold px-2 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800/60 rounded">
                            {trackedTicket.id}
                          </span>
                          <h4 className="font-bold text-white text-base mt-2">{trackedTicket.subject}</h4>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          trackedTicket.status === 'Resolved & Replied'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                            : 'bg-amber-950 text-amber-300 border-amber-800/60'
                        }`}>
                          {trackedTicket.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1">
                        <div><strong className="text-slate-500">Submitted by:</strong> {trackedTicket.email}</div>
                        <div><strong className="text-slate-500">Date:</strong> {trackedTicket.createdAt}</div>
                        <div><strong className="text-slate-500">Category:</strong> {trackedTicket.category}</div>
                      </div>

                      <div className="bg-slate-900 p-3 rounded-lg text-xs text-slate-300 border border-slate-800">
                        <strong className="text-slate-400 block mb-1">Your Issue Description:</strong>
                        {trackedTicket.description}
                      </div>

                      {/* OFFICIAL REPLY SECTION & COMPLAINANT CONFIRMATION BUTTON */}
                      {trackedTicket.reply ? (
                        <div className="bg-slate-900 p-4 rounded-xl border border-cyan-800/50 space-y-3">
                          <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold border-b border-slate-800 pb-2">
                            <span>Official Support Resolution ({trackedTicket.repliedAt}):</span>
                            <span>Signed: {trackedTicket.repliedBy}</span>
                          </div>

                          <p className="text-xs text-slate-200 leading-relaxed">{trackedTicket.reply}</p>

                          {/* COMPLAINANT CONFIRMATION & ACKNOWLEDGMENT */}
                          <div className="pt-3 border-t border-slate-800 space-y-3">
                            {trackedTicket.confirmedByComplainantAt ? (
                              <div className="p-3 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
                                <span>✓</span>
                                <span>Receipt officially confirmed by you on {trackedTicket.confirmedByComplainantAt}</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleConfirmReceipt(trackedTicket.id)}
                                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/20"
                              >
                                ✓ Confirm Receipt & Acknowledge Resolution
                              </button>
                            )}

                            {/* FOLLOW-UP MESSAGE INPUT */}
                            <div className="space-y-2 pt-2">
                              {trackedTicket.followUpMessage && (
                                <div className="p-2.5 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-200">
                                  <strong>Your Recorded Follow-up:</strong> "{trackedTicket.followUpMessage}"
                                </div>
                              )}

                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  placeholder="Write a follow-up inquiry if needed..."
                                  value={userFollowUpInput}
                                  onChange={(e) => setUserFollowUpInput(e.target.value)}
                                  className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                                />
                                <button
                                  onClick={() => handleAddFollowUp(trackedTicket.id)}
                                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
                                >
                                  Submit Follow-up
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-300">
                          ⏳ Your ticket is currently queued and under active review by the Executive Desk. Please check back shortly.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}==============================
