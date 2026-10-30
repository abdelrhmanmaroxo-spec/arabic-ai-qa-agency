import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, CheckCircle, Lock, Cpu, Server, Eye, EyeOff, Key, Terminal,
  Briefcase, ChevronRight, Download, UserCheck, Database, ShieldCheck,
  Settings, RefreshCw
} from 'lucide-react';

import { SECURITY_QUESTIONS, INITIAL_ACCOUNTS_REGISTRY } from './accountsRegistry';
import { INITIAL_SECURITY_VAULT, computeVaultDigest } from './securityVault';
import {
  INITIAL_PLATFORM_CONFIG,
  SPECIALIZATION_TRACKS,
  LIVE_STUDIO_DEMOS,
  INITIAL_PLATFORM_PROJECTS,
  MASTER_CONTRACT_ARTICLES
} from './platformConstants';
import {
  isMasterOwnerEmail,
  verifyIsMasterOwner,
  fetchCloudState,
  upsertCloudState,
  buildPasswordResetDispatchPackage,
  exportSplitVaultBackup,
  downloadMasterNdaFile
} from './cloudSyncService';

export default function App() {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('stealth_theme_v11') || 'dark');
  const isDark = themeMode === 'dark';

  const [brand, setBrand] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_brand_v11');
      return saved ? { ...INITIAL_PLATFORM_CONFIG, ...JSON.parse(saved) } : INITIAL_PLATFORM_CONFIG;
    } catch {
      return INITIAL_PLATFORM_CONFIG;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_projects_v11');
      return saved ? JSON.parse(saved) : INITIAL_PLATFORM_PROJECTS;
    } catch {
      return INITIAL_PLATFORM_PROJECTS;
    }
  });

  const [activeNav, setActiveNav] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeDemo, setActiveDemo] = useState(LIVE_STUDIO_DEMOS[0]);
  const [showDemoJson, setShowDemoJson] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_session_v11');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_registry_v11');
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS_REGISTRY;
    } catch {
      return INITIAL_ACCOUNTS_REGISTRY;
    }
  });

  const [securityVault, setSecurityVault] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_vault_v11');
      return saved ? JSON.parse(saved) : INITIAL_SECURITY_VAULT;
    } catch {
      return INITIAL_SECURITY_VAULT;
    }
  });

  const [applicants, setApplicants] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_applicants_v11');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [tickets, setTickets] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_tickets_v11');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [pocs, setPocs] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_pocs_v11');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [resets, setResets] = useState(() => {
    try {
      const saved = localStorage.getItem('stealth_resets_v11');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cloudStatus, setCloudStatus] = useState('Connecting...');
  const isHydratingRef = useRef(true);

  const pullFromSupabaseCloud = async () => {
    try {
      const res = await fetchCloudState(brand);
      setCloudStatus(res.status);
      if (res.ok && res.row) {
        const row = res.row;
        if (Array.isArray(row.users_registry) && row.users_registry.length > 0) setUsers(row.users_registry);
        if (row.security_vault && Object.keys(row.security_vault).length > 0) setSecurityVault(row.security_vault);
        if (Array.isArray(row.applicants)) setApplicants(row.applicants);
        if (Array.isArray(row.tickets)) setTickets(row.tickets);
        if (Array.isArray(row.pocs)) setPocs(row.pocs);
        if (Array.isArray(row.resets)) setResets(row.resets);
        if (row.brand && Object.keys(row.brand).length > 0) {
          if (Array.isArray(row.brand.customProjects) && row.brand.customProjects.length > 0) {
            setProjects(row.brand.customProjects);
          }
          setBrand(prev => ({ ...prev, ...row.brand, cloudUrl: res.url, cloudKey: res.key }));
        }
      }
    } catch {
      setCloudStatus('Offline Cache');
    } finally {
      isHydratingRef.current = false;
    }
  };

  const pushToSupabaseCloud = async (overrideBrand, overrideProjects, overrideUsers) => {
    try {
      setCloudStatus('Syncing...');
      const res = await upsertCloudState({
        brand: overrideBrand || brand,
        projects: overrideProjects || projects,
        users: overrideUsers || users,
        securityVault,
        applicants,
        tickets,
        pocs,
        resets
      });
      setCloudStatus(res.status);
    } catch {
      setCloudStatus('Local Saved');
    }
  };

  useEffect(() => {
    pullFromSupabaseCloud();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('stealth_theme_v11', themeMode);
      localStorage.setItem('stealth_brand_v11', JSON.stringify(brand));
      localStorage.setItem('stealth_projects_v11', JSON.stringify(projects));
      if (currentUser) localStorage.setItem('stealth_session_v11', JSON.stringify(currentUser));
      else localStorage.removeItem('stealth_session_v11');
      localStorage.setItem('stealth_registry_v11', JSON.stringify(users));
      localStorage.setItem('stealth_vault_v11', JSON.stringify(securityVault));
      localStorage.setItem('stealth_applicants_v11', JSON.stringify(applicants));
      localStorage.setItem('stealth_tickets_v11', JSON.stringify(tickets));
      localStorage.setItem('stealth_pocs_v11', JSON.stringify(pocs));
      localStorage.setItem('stealth_resets_v11', JSON.stringify(resets));
    } catch {}

    if (!isHydratingRef.current) {
      const timer = setTimeout(() => pushToSupabaseCloud(), 600);
      return () => clearTimeout(timer);
    }
  }, [themeMode, brand, projects, currentUser, users, securityVault, applicants, tickets, pocs, resets]);

  // Real-time Session & Lock Sync
  useEffect(() => {
    if (currentUser && currentUser.keyId !== 'KEY-MASTER-OWNER') {
      const reg = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase());
      if (reg) {
        if (reg.isBanned || reg.status === 'BANNED') {
          setCurrentUser(null);
          setActiveNav('home');
          alert('ACCOUNT TERMINATED: Your access has been permanently revoked by the Master Owner.');
        } else if (
          reg.certifiedForProjects !== currentUser.certifiedForProjects ||
          reg.role !== currentUser.role ||
          reg.cvFile !== currentUser.cvFile ||
          reg.age !== currentUser.age
        ) {
          setCurrentUser(reg);
        }
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
    age: '',
    gender: 'Male',
    specialization: SPECIALIZATION_TRACKS[0],
    dialect: 'Egyptian (AR-EG • Cairene / Alexandrian)',
    track: INITIAL_PLATFORM_PROJECTS[0].name,
    pass: '',
    secQuestion: SECURITY_QUESTIONS[0],
    secAnswer: '',
    cvFileName: '',
    cvDataUrl: '',
    agreedNDA: false
  });
  const [appSubmitted, setAppSubmitted] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    specialization: SPECIALIZATION_TRACKS[0],
    dialect: 'Egyptian (AR-EG • Cairene & Alexandrian)',
    phone: '',
    bio: '',
    cvFile: '',
    cvDataUrl: '',
    secQuestion: SECURITY_QUESTIONS[0],
    secAnswer: '',
    newPassword: ''
  });
  const [profileSavedMsg, setProfileSavedMsg] = useState('');

  useEffect(() => {
    if (currentUser) {
      const reg = users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase()) || currentUser;
      const appMatch = applicants.find(a => a.email.toLowerCase() === currentUser.email.toLowerCase());
      setProfileForm({
        name: reg.name || currentUser.name || '',
        age: reg.age || appMatch?.age || '24',
        gender: reg.gender || appMatch?.gender || 'Male',
        specialization: reg.specialization || appMatch?.specialization || SPECIALIZATION_TRACKS[0],
        dialect: reg.dialect || appMatch?.dialect || 'Egyptian (AR-EG • Cairene & Alexandrian)',
        phone: reg.phone || '+20 ',
        bio: reg.bio || 'Certified AI Quality Assurance Specialist.',
        cvFile: reg.cvFile || appMatch?.cvFile || '',
        cvDataUrl: reg.cvDataUrl || appMatch?.cvDataUrl || '',
        secQuestion: reg.secQuestion || SECURITY_QUESTIONS[0],
        secAnswer: reg.secAnswer || '',
        newPassword: ''
      });
    }
  }, [currentUser, users, applicants]);

  const [inboxQuery, setInboxQuery] = useState('');
  const [inboxTicket, setInboxTicket] = useState(null);
  const [newTicketEmail, setNewTicketEmail] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMsg, setNewTicketMsg] = useState('');
  const [ticketSubmitMsg, setTicketSubmitMsg] = useState('');

  const [adminTab, setAdminTab] = useState('1');
  const [replyDrafts, setReplyDrafts] = useState({});
  const [dispatchedResetModal, setDispatchedResetModal] = useState(null);

  const [provEmail, setProvEmail] = useState('');
  const [provPass, setProvPass] = useState('TempPass2026!');
  const [provRole, setProvRole] = useState('evaluator');
  const [provMsg, setProvMsg] = useState('');

  const [editBrand, setEditBrand] = useState({ ...brand });
  useEffect(() => setEditBrand({ ...brand }), [brand]);

  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-TRN-101');
  const [workbenchTaskIndex, setWorkbenchTaskIndex] = useState(0);
  const [workbenchText, setWorkbenchText] = useState('');
  const [workbenchSavedMsg, setWorkbenchSavedMsg] = useState('');

  const liveRegistryUser = currentUser
    ? users.find(u => u.email.toLowerCase() === currentUser.email.toLowerCase()) || currentUser
    : null;

  const isOwner = currentUser?.role === 'owner' || currentUser?.keyId === 'KEY-MASTER-OWNER';
  const isSales = liveRegistryUser?.role === 'sales';
  const isSupport = liveRegistryUser?.role === 'support';
  const isEvaluator = liveRegistryUser?.role === 'evaluator';
  const isExecutive = isOwner || isSales || isSupport;
  const isProjectQueueUnlocked = isOwner || (isEvaluator && Boolean(liveRegistryUser?.certifiedForProjects));

  useEffect(() => {
    if (activeNav === 'helpdesk' && currentUser?.email) {
      setInboxQuery(currentUser.email);
      const found = tickets.find(t => t.senderEmail.toLowerCase() === currentUser.email.toLowerCase());
      if (found) setInboxTicket(found);
    }
  }, [activeNav, currentUser, tickets]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    const emailClean = authEmail.trim().toLowerCase();
    const passClean = authPass.trim();

    if (await verifyIsMasterOwner(emailClean, passClean)) {
      const ownerSession = {
        keyId: 'KEY-MASTER-OWNER',
        email: emailClean,
        role: 'owner',
        name: brand.leadArchitect,
        age: '23',
        gender: 'Male',
        specialization: 'Principal AI Systems & Full-Stack Architecture',
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

    const found = users.find(u => u.email.toLowerCase() === emailClean);
    if (!found) return setAuthMsg('Invalid email or password.');
    if (found.isBanned || found.status === 'BANNED') return setAuthMsg('ACCOUNT TERMINATED by Master Owner.');

    const enteredDigest = await computeVaultDigest(emailClean, passClean);
    if (securityVault[found.keyId] === enteredDigest) {
      setCurrentUser(found);
      setShowAuthModal(false);
      setAuthEmail('');
      setAuthPass('');
      setActiveNav(found.role === 'evaluator' ? 'profile' : 'admin');
    } else {
      setAuthMsg('Invalid email or password.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthMsg('');
    const cleanEmail = authEmail.trim().toLowerCase();
    if (isMasterOwnerEmail(cleanEmail)) return setAuthMsg('Reserved for Master Owner. Use Sign In.');
    if (users.find(u => u.email.toLowerCase() === cleanEmail)) return setAuthMsg('Account already exists.');

    const newKeyId = 'KEY-USR-' + Date.now();
    const digest = await computeVaultDigest(cleanEmail, authPass.trim());
    const newUser = {
      keyId: newKeyId,
      email: cleanEmail,
      role: 'evaluator',
      name: cleanEmail.split('@')[0],
      age: '',
      gender: 'Male',
      specialization: SPECIALIZATION_TRACKS[0],
      cvFile: '',
      cvDataUrl: '',
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
    setActiveNav('profile');
  };

  const handleInstantReset = async (e) => {
    e.preventDefault();
    const targetUser = users.find(u => u.email.toLowerCase() === resetFlowEmail.trim().toLowerCase());
    if (!targetUser) return setResetFlowMsg('No account found.');
    if (targetUser.secAnswer.trim().toLowerCase() !== resetFlowSecA.trim().toLowerCase()) {
      return setResetFlowMsg('Incorrect security answer.');
    }
    const newDigest = await computeVaultDigest(targetUser.email, resetFlowNewPass.trim());
    setSecurityVault(prev => ({ ...prev, [targetUser.keyId]: newDigest }));
    setResetFlowMsg('✓ Password updated! Switch to Sign In.');
  };

  const handleOpenTicket = (e) => {
    e.preventDefault();
    const tckId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
    const newT = {
      id: tckId,
      senderEmail: newTicketEmail.trim(),
      subject: newTicketSubject || 'Support Inquiry',
      thread: [{ sender: 'user', text: newTicketMsg, time: new Date().toLocaleString() }],
      status: 'OPEN',
      createdAt: new Date().toLocaleString(),
      receiptConfirmed: false
    };
    setTickets(prev => [newT, ...prev]);
    setInboxTicket(newT);
    setTicketSubmitMsg(`✓ Ticket ${tckId} created!`);
    setNewTicketSubject('');
    setNewTicketMsg('');
  };

  const handleCertifyApplicant = async (app) => {
    setApplicants(prev => prev.map(a => (a.id === app.id ? { ...a, status: 'CERTIFIED' } : a)));
    const cleanEmail = app.email.trim().toLowerCase();
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === cleanEmail ? { ...u, certifiedForProjects: true, status: 'ACTIVE' } : u
    );
    setUsers(updatedUsers);
    pushToSupabaseCloud(brand, projects, updatedUsers);
  };

  const handleAdminReplyTicket = (ticketId) => {
    const draft = (replyDrafts[ticketId] || '').trim();
    if (!draft) return;
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? { ...t, thread: [...t.thread, { sender: 'support', text: draft, time: new Date().toLocaleString() }], status: 'REPLIED' }
          : t
      )
    );
    setReplyDrafts(prev => ({ ...prev, [ticketId]: '' }));
  };

  const handleProvisionUser = async (e) => {
    e.preventDefault();
    const cleanEmail = provEmail.trim().toLowerCase();
    if (users.find(u => u.email.toLowerCase() === cleanEmail)) return setProvMsg('Account exists.');
    const newKeyId = 'KEY-PRO-' + Date.now();
    const digest = await computeVaultDigest(cleanEmail, provPass.trim());
    const newU = {
      keyId: newKeyId,
      email: cleanEmail,
      role: provRole,
      name: cleanEmail.split('@')[0],
      age: '25',
      gender: 'Male',
      specialization: SPECIALIZATION_TRACKS[0],
      certifiedForProjects: false,
      secQuestion: SECURITY_QUESTIONS[0],
      secAnswer: 'Verified',
      status: 'ACTIVE',
      isBanned: false
    };
    setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
    const updated = [...users, newU];
    setUsers(updated);
    pushToSupabaseCloud(brand, projects, updated);
    setProvMsg(`✓ ${cleanEmail} activated!`);
    setProvEmail('');
  };

  const handleToggleProjectAccess = (email) => {
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === email.toLowerCase() ? { ...u, certifiedForProjects: !u.certifiedForProjects } : u
    );
    setUsers(updatedUsers);
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      setCurrentUser(updatedUsers.find(u => u.email.toLowerCase() === email.toLowerCase()));
    }
    pushToSupabaseCloud(brand, projects, updatedUsers);
  };

  const handleToggleBanUser = (email) => {
    const updatedUsers = users.map(u =>
      u.email.toLowerCase() === email.toLowerCase()
        ? { ...u, isBanned: !u.isBanned, status: !u.isBanned ? 'BANNED' : 'ACTIVE', certifiedForProjects: false }
        : u
    );
    setUsers(updatedUsers);
    pushToSupabaseCloud(brand, projects, updatedUsers);
  };

  const handleAdminDispatchResetLink = async (user) => {
    const pkg = buildPasswordResetDispatchPackage(user, brand.brandName);
    const newDigest = await computeVaultDigest(user.email, pkg.tempPass);
    setSecurityVault(prev => ({ ...prev, [user.keyId]: newDigest }));
    setTickets(prev => [
      {
        id: 'RST-' + Math.floor(1000 + Math.random() * 9000),
        senderEmail: user.email,
        subject: 'Official Password Reset & Temporary Credentials',
        thread: [{ sender: 'support', text: `Temp Password: ${pkg.tempPass} | Token: ${pkg.token}`, time: new Date().toLocaleString() }],
        status: 'REPLIED',
        createdAt: new Date().toLocaleString()
      },
      ...prev
    ]);
    setDispatchedResetModal(pkg);
  };

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = appForm.email.trim().toLowerCase();
    if (isMasterOwnerEmail(cleanEmail)) return alert('Please use a non-owner email to test onboarding.');
    const newKeyId = 'KEY-APP-' + Date.now();
    const digest = await computeVaultDigest(cleanEmail, appForm.pass || 'EvalPass2026!');

    const appObj = {
      id: 'APP-' + Math.floor(100 + Math.random() * 900),
      keyId: newKeyId,
      name: appForm.name,
      email: cleanEmail,
      age: appForm.age || '24',
      gender: appForm.gender,
      specialization: appForm.specialization,
      dialect: appForm.dialect,
      track: appForm.track,
      cvFile: appForm.cvFileName || 'Specialist_CV.pdf',
      cvDataUrl: appForm.cvDataUrl || '',
      secQuestion: appForm.secQuestion,
      secAnswer: appForm.secAnswer,
      status: 'PENDING',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setApplicants(prev => [appObj, ...prev]);

    const newEvalUser = { ...appObj, role: 'evaluator', certifiedForProjects: false, isBanned: false };
    setSecurityVault(prev => ({ ...prev, [newKeyId]: digest }));
    const updatedUsers = [...users.filter(u => u.email.toLowerCase() !== cleanEmail), newEvalUser];
    setUsers(updatedUsers);
    setCurrentUser(newEvalUser);
    pushToSupabaseCloud(brand, projects, updatedUsers);
    setAppSubmitted(true);
  };

  const handleSaveFullProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    if (profileForm.newPassword && profileForm.newPassword.trim().length >= 6) {
      const newDigest = await computeVaultDigest(currentUser.email, profileForm.newPassword.trim());
      setSecurityVault(prev => ({ ...prev, [currentUser.keyId]: newDigest }));
    }
    const updatedUserObj = {
      ...liveRegistryUser,
      ...profileForm,
      email: currentUser.email,
      role: liveRegistryUser?.role || currentUser.role
    };
    const updatedUsers = users.map(u => (u.email.toLowerCase() === currentUser.email.toLowerCase() ? updatedUserObj : u));
    setUsers(updatedUsers);
    setCurrentUser(updatedUserObj);
    setProfileSavedMsg('✓ Profile, Specialization & Persistent CV saved and synced to Cloud!');
    pushToSupabaseCloud(brand, projects, updatedUsers);
  };

  const currentProjectObj = projects.find(p => p.id === selectedProjectId) || projects[0];
  const activeAccentGrad = 'from-emerald-500 to-teal-400';

  return (
    <div className={`min-h-screen font-sans flex flex-col relative overflow-x-hidden ${isDark ? 'bg-[#050811] text-slate-100' : 'strict-white-monochrome bg-white text-black'}`}>
      {!isDark && (
        <style>{`
          .strict-white-monochrome, .strict-white-monochrome * {
            background-color: #ffffff !important;
            background-image: none !important;
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
            box-shadow: none !important;
          }
          .strict-white-monochrome [class*="border"],
          .strict-white-monochrome input,
          .strict-white-monochrome select,
          .strict-white-monochrome textarea,
          .strict-white-monochrome button {
            border: 1.5px solid #000000 !important;
          }
          .strict-white-monochrome button:hover {
            background-color: #000000 !important;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
          }
        `}</style>
      )}

      {/* HEADER */}
      <header className="border-b border-slate-800/80 bg-[#070b16]/90 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNav('home')}>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeAccentGrad} flex items-center justify-center font-black text-slate-950`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg text-white">{brand.brandName}</span>
            <span className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {cloudStatus}
            </span>
          </div>
        </div>

        <nav className="flex items-center flex-wrap gap-1 p-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-semibold">
          {[
            { id: 'home', label: 'Enterprise Foundry', show: true },
            { id: 'evaluator-workbench', label: '💼 Evaluator Workbench', show: isEvaluator || isOwner, locked: !isProjectQueueUnlocked },
            { id: 'apply', label: 'Onboarding & CV', show: !currentUser || isOwner },
            { id: 'helpdesk', label: 'Helpdesk Inbox', show: true },
            { id: 'profile', label: '👤 My Profile & CV', show: Boolean(currentUser) },
            { id: 'settings', label: '📜 Legal NDA & Theme', show: true }
          ]
            .filter(t => t.show)
            .map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveNav(tab.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                  activeNav === tab.id ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {tab.locked && <Lock className="w-3 h-3 text-amber-400" />}
              </button>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-amber-300 text-xs font-bold"
          >
            {isDark ? '☀️ Pure White & Black' : '🌙 Stealth Dark Mode'}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 border border-emerald-500/30 bg-slate-900 rounded-xl px-3 py-1.5 text-xs">
              <span className="font-bold text-white cursor-pointer" onClick={() => setActiveNav('profile')}>
                {liveRegistryUser?.name || currentUser.email} ({isProjectQueueUnlocked ? 'UNLOCKED' : 'LOCKED'})
              </span>
              <button onClick={() => { setCurrentUser(null); setActiveNav('home'); }} className="text-rose-400 font-bold ml-2">
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-black">
              Workspace Sign-In
            </button>
          )}

          {isExecutive && (
            <button onClick={() => setActiveNav('admin')} className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">
              Master Admin
            </button>
          )}
        </div>
      </header>

      {/* BODY WITH SIDEBAR */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {currentUser && (
          <aside className={`lg:w-64 shrink-0 bg-[#0b1020] border border-slate-800 rounded-3xl p-5 space-y-4 self-start ${!sidebarOpen ? 'lg:w-20' : ''}`}>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              {sidebarOpen && <span className="font-black text-xs text-emerald-400 uppercase">Workspace Menu</span>}
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xs px-2 py-1 rounded bg-slate-900 border border-slate-700">
                {sidebarOpen ? '◀' : '▶'}
              </button>
            </div>
            <div className="space-y-1.5 text-xs font-bold">
              <button onClick={() => setActiveNav('profile')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900">
                👤 {sidebarOpen && 'My Profile, Age & CV'}
              </button>
              {(isEvaluator || isOwner) && (
                <button onClick={() => setActiveNav('evaluator-workbench')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900">
                  💼 {sidebarOpen && `Workbench (${isProjectQueueUnlocked ? 'Unlocked' : 'Locked'})`}
                </button>
              )}
              <button onClick={() => setActiveNav('helpdesk')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900">
                💬 {sidebarOpen && 'Helpdesk Inbox'}
              </button>
              <button onClick={() => setActiveNav('settings')} className="w-full text-left p-2.5 rounded-xl hover:bg-slate-900">
                📜 {sidebarOpen && '12-Article NDA & Theme'}
              </button>
            </div>
          </aside>
        )}

        <main className="flex-1 min-w-0 space-y-12">
          {activeNav === 'home' && (
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-5">
                <h1 className="text-4xl font-black text-white">
                  {brand.heroTitleLine1} <span className="text-emerald-400">{brand.heroTitleHighlight}</span>
                </h1>
                <p className="text-slate-300 text-sm leading-relaxed">{brand.heroSubtitle}</p>
                <div className="flex gap-3">
                  <button onClick={() => setActiveNav(currentUser ? 'profile' : 'apply')} className="px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">
                    {currentUser ? 'Open My Profile & CV' : 'Apply as Specialist'}
                  </button>
                  <button onClick={() => setActiveNav('settings')} className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs">
                    📜 Read 12-Article NDA
                  </button>
                </div>
              </div>
              <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
                <div className="font-black text-emerald-400">{activeDemo.badge} — {activeDemo.domain}</div>
                <p className="p-3 rounded-xl bg-slate-950 border border-slate-800">{activeDemo.stimulus}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">{activeDemo.modelA.response}</div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">{activeDemo.modelB.response}</div>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'evaluator-workbench' && (
            <div>
              {!isProjectQueueUnlocked ? (
                <div className="p-10 rounded-3xl bg-[#0b1020] border border-amber-500/40 text-center space-y-4">
                  <Lock className="w-10 h-10 text-amber-400 mx-auto" />
                  <h2 className="text-xl font-black text-white">🔒 Evaluator Project Queue is LOCKED</h2>
                  <p className="text-xs text-slate-300">
                    The Master Owner has locked project submissions for your account. You cannot view or submit tasks until unlocked.
                  </p>
                </div>
              ) : (
                <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
                  <h2 className="text-lg font-black text-white">{currentProjectObj.name} ({currentProjectObj.payRate})</h2>
                  <p className="p-4 rounded-xl bg-slate-950 border border-slate-800">{currentProjectObj.samplePrompt}</p>
                  <textarea
                    rows={4}
                    value={workbenchText}
                    onChange={e => setWorkbenchText(e.target.value)}
                    onPaste={e => { e.preventDefault(); alert('ZERO-AI POLICY: Paste disabled.'); }}
                    placeholder="Type human evaluation here..."
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                  {workbenchSavedMsg && <p className="text-emerald-400 font-bold">{workbenchSavedMsg}</p>}
                  <button
                    onClick={() => {
                      const fresh = users.find(u => u.email.toLowerCase() === currentUser?.email?.toLowerCase());
                      if (!isOwner && (!fresh || !fresh.certifiedForProjects)) return alert('LOCKED BY OWNER!');
                      setWorkbenchSavedMsg('✓ Task submitted!');
                      setWorkbenchText('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black"
                  >
                    Submit Verified Task →
                  </button>
                </div>
              )}
            </div>
          )}

          {activeNav === 'profile' && currentUser && (
            <form onSubmit={handleSaveFullProfile} className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-lg font-black text-white">👤 My Specialist Profile, Demographics & Persistent CV</h2>
                {profileForm.cvDataUrl && (
                  <a href={profileForm.cvDataUrl} download={profileForm.cvFile || 'CV.pdf'} className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black">
                    📥 Download My CV ({profileForm.cvFile})
                  </a>
                )}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" required value={profileForm.name} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} placeholder="Full Name" className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="number" required value={profileForm.age} onChange={e => setProfileForm({ ...profileForm, age: e.target.value })} placeholder="Age (العمر)" className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <select value={profileForm.gender} onChange={e => setProfileForm({ ...profileForm, gender: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white">
                  <option value="Male">Male (ذكر)</option>
                  <option value="Female">Female (أنثى)</option>
                </select>
                <select value={profileForm.specialization} onChange={e => setProfileForm({ ...profileForm, specialization: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold">
                  {SPECIALIZATION_TRACKS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="sm:col-span-2 p-4 rounded-xl bg-slate-950 border border-dashed border-emerald-500/50">
                  <label className="block font-bold text-emerald-400 mb-1">Persistent CV File: {profileForm.cvFile || 'None uploaded'}</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const reader = new FileReader();
                      reader.onload = () => setProfileForm(prev => ({ ...prev, cvFile: f.name, cvDataUrl: String(reader.result || '') }));
                      reader.readAsDataURL(f);
                    }}
                  />
                </div>
              </div>
              {profileSavedMsg && <p className="text-emerald-400 font-bold">{profileSavedMsg}</p>}
              <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">
                💾 Save Profile & Persistent CV
              </button>
            </form>
          )}

          {activeNav === 'apply' && (
            <form onSubmit={handleOnboardingSubmit} autoComplete="off" className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
              <h2 className="text-xl font-black text-white">Evaluator Onboarding, Age, Specialization & CV</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" required placeholder="Full Name *" value={appForm.name} onChange={e => setAppForm({ ...appForm, name: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="email" required placeholder="Email *" value={appForm.email} onChange={e => setAppForm({ ...appForm, email: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="number" required placeholder="Age (العمر) *" value={appForm.age} onChange={e => setAppForm({ ...appForm, age: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <select value={appForm.gender} onChange={e => setAppForm({ ...appForm, gender: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white">
                  <option value="Male">Male (ذكر)</option>
                  <option value="Female">Female (أنثى)</option>
                </select>
                <select value={appForm.specialization} onChange={e => setAppForm({ ...appForm, specialization: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 font-bold sm:col-span-2">
                  {SPECIALIZATION_TRACKS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <input type="password" required placeholder="Password *" value={appForm.pass} onChange={e => setAppForm({ ...appForm, pass: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="text" required placeholder="Security Answer *" value={appForm.secAnswer} onChange={e => setAppForm({ ...appForm, secAnswer: e.target.value })} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <div className="sm:col-span-2 p-3 rounded-xl bg-slate-950 border border-dashed border-emerald-500/40">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const r = new FileReader();
                      r.onload = () => setAppForm(prev => ({ ...prev, cvFileName: f.name, cvDataUrl: String(r.result || '') }));
                      r.readAsDataURL(f);
                    }}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={appForm.agreedNDA} onChange={e => setAppForm({ ...appForm, agreedNDA: e.target.checked })} />
                <span>I accept the 12-Article Master NDA & Strict Zero-AI Policy.</span>
              </label>
              <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">
                Submit Onboarding & Save CV to Profile →
              </button>
            </form>
          )}

          {activeNav === 'helpdesk' && (
            <div className="grid lg:grid-cols-2 gap-6 text-xs">
              <form onSubmit={handleOpenTicket} className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-3">
                <h3 className="font-black text-white text-base">Open Support Ticket</h3>
                <input type="email" required placeholder="Your Email *" value={newTicketEmail} onChange={e => setNewTicketEmail(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="text" required placeholder="Subject *" value={newTicketSubject} onChange={e => setNewTicketSubject(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <textarea rows={3} required placeholder="Message *" value={newTicketMsg} onChange={e => setNewTicketMsg(e.target.value)} className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                {ticketSubmitMsg && <p className="text-emerald-400 font-bold">{ticketSubmitMsg}</p>}
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">Submit Ticket</button>
              </form>
              <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-3">
                <h3 className="font-black text-white text-base">Support Inbox</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Search Email or Ticket ID" value={inboxQuery} onChange={e => setInboxQuery(e.target.value)} className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                  <button onClick={() => setInboxTicket(tickets.find(t => t.id.toLowerCase() === inboxQuery.toLowerCase() || t.senderEmail.toLowerCase() === inboxQuery.toLowerCase()) || null)} className="px-4 rounded-xl bg-emerald-500 text-slate-950 font-black">Search</button>
                </div>
                {inboxTicket && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-400">{inboxTicket.id} — {inboxTicket.subject}</div>
                    {inboxTicket.thread.map((m, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <strong>{m.sender.toUpperCase()}:</strong> {m.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black text-white">📜 12-Article Master NDA & Theme Mode</h2>
                <button onClick={() => downloadMasterNdaFile(brand.brandName, currentUser)} className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black">
                  Download NDA (.TXT)
                </button>
              </div>
              <div className="h-80 overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
                {MASTER_CONTRACT_ARTICLES.map(art => (
                  <div key={art.id}>
                    <strong className="text-emerald-400">ARTICLE {art.id} — {art.title}:</strong> {art.content}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'admin' && isExecutive && (
            <div className="space-y-6 text-xs">
              <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
                <button onClick={() => setAdminTab('1')} className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 font-bold">1. Evaluators ({applicants.length})</button>
                <button onClick={() => setAdminTab('2')} className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 font-bold">2. Tickets ({tickets.length})</button>
                <button onClick={() => setAdminTab('3')} className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black">3. Accounts, Lock & Gmail Reset ({users.length})</button>
                <button onClick={() => setAdminTab('4')} className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black">4. Pricing & Projects CMS</button>
                <button onClick={() => exportSplitVaultBackup(users, securityVault)} className="px-3.5 py-2 rounded-xl bg-cyan-400 text-slate-950 font-black ml-auto">Export Vault JS</button>
              </div>

              {adminTab === '1' && applicants.map(app => (
                <div key={app.id} className="p-4 rounded-2xl bg-[#0b1020] border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{app.name} ({app.email}) — Age: {app.age} • {app.gender}</div>
                    <div className="text-slate-400">{app.specialization} • CV: {app.cvFile}</div>
                  </div>
                  <div className="flex gap-2">
                    {app.cvDataUrl && <a href={app.cvDataUrl} download={app.cvFile} className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold">Download CV</a>}
                    <button onClick={() => handleCertifyApplicant(app)} className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black">✓ Certify</button>
                  </div>
                </div>
              ))}

              {adminTab === '2' && tickets.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-400">{t.id} — {t.subject} ({t.senderEmail})</div>
                  {t.thread.map((m, i) => <div key={i}><strong>{m.sender}:</strong> {m.text}</div>)}
                  <div className="flex gap-2">
                    <input type="text" value={replyDrafts[t.id] || ''} onChange={e => setReplyDrafts({ ...replyDrafts, [t.id]: e.target.value })} placeholder="Reply..." className="flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-white" />
                    <button onClick={() => handleAdminReplyTicket(t.id)} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-black">Send</button>
                  </div>
                </div>
              ))}

              {adminTab === '3' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  <form onSubmit={handleProvisionUser} className="p-4 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-3">
                    <h4 className="font-black text-white">Provision Account</h4>
                    <input type="email" required value={provEmail} onChange={e => setProvEmail(e.target.value)} placeholder="Email" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                    <input type="text" required value={provPass} onChange={e => setProvPass(e.target.value)} placeholder="Password" className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                    <select value={provRole} onChange={e => setProvRole(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white">
                      <option value="evaluator">Evaluator</option>
                      <option value="sales">Sales & Pricing</option>
                      <option value="support">Support</option>
                    </select>
                    {provMsg && <p className="text-emerald-400 font-bold">{provMsg}</p>}
                    <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black">+ Activate</button>
                  </form>

                  <div className="lg:col-span-2 space-y-3">
                    {users.map(u => (
                      <div key={u.email} className="p-4 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-white">{u.name} ({u.email}) — {u.role.toUpperCase()}</span>
                          {u.cvFile && <span className="text-amber-400">📄 {u.cvFile}</span>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleToggleProjectAccess(u.email)} className={`px-3 py-1.5 rounded-lg font-black ${u.certifiedForProjects ? 'bg-emerald-500 text-slate-950' : 'bg-rose-600 text-white'}`}>
                            {u.certifiedForProjects ? '✓ Projects Unlocked (Click to Lock)' : '🔒 Projects Locked (Click to Unlock)'}
                          </button>
                          <button onClick={() => handleAdminDispatchResetLink(u)} className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black">
                            🔑 Send Reset via Gmail
                          </button>
                          {isOwner && (
                            <button onClick={() => handleToggleBanUser(u.email)} className="px-3 py-1.5 rounded-lg bg-rose-900 text-white font-bold">
                              {u.isBanned ? 'Unban' : '🚫 Ban'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === '4' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {projects.map(p => (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#0b1020] border border-slate-800 space-y-2">
                      <input type="text" value={p.name} onChange={e => setProjects(prev => prev.map(x => x.id === p.id ? { ...x, name: e.target.value } : x))} className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-bold" />
                      <input type="text" value={p.payRate} onChange={e => setProjects(prev => prev.map(x => x.id === p.id ? { ...x, payRate: e.target.value } : x))} className="w-full p-2 rounded-lg bg-slate-950 border border-amber-500/40 text-amber-300 font-bold" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* GMAIL PASSWORD RESET MODAL */}
      {dispatchedResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0b1020] border border-emerald-500 rounded-3xl p-6 space-y-4 text-xs">
            <h3 className="font-black text-white text-base">🔑 Temporary Password Ready for {dispatchedResetModal.email}</h3>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
              Temp Password: <strong className="text-amber-400">{dispatchedResetModal.tempPass}</strong>
            </div>
            <a href={dispatchedResetModal.gmailComposeUrl} target="_blank" rel="noreferrer" className="block w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-center">
              📧 Click to Send via Gmail Compose →
            </a>
            <button onClick={() => setDispatchedResetModal(null)} className="w-full py-2 rounded-xl bg-slate-800 text-white font-bold">
              Close
            </button>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0b1020] border border-slate-800 rounded-3xl p-6 space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-white text-base">Workspace Sign-In</h3>
              <button onClick={() => setShowAuthModal(false)}>✕</button>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl">
              <button onClick={() => setAuthTab('signin')} className={`py-2 rounded-lg font-bold ${authTab === 'signin' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>Sign In</button>
              <button onClick={() => setAuthTab('signup')} className={`py-2 rounded-lg font-bold ${authTab === 'signup' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>Register</button>
              <button onClick={() => setAuthTab('forgot')} className={`py-2 rounded-lg font-bold ${authTab === 'forgot' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>Forgot</button>
            </div>

            {authTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-3">
                <input type="email" required value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <div className="relative">
                  <input type={showPasswordText ? 'text' : 'password'} required value={authPass} onChange={e => setAuthPass(e.target.value)} placeholder="Password" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                  <button type="button" onClick={() => setShowPasswordText(!showPasswordText)} className="absolute right-3 top-3 text-slate-400">
                    {showPasswordText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authMsg && <p className="text-rose-400 font-bold">{authMsg}</p>}
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">Sign In →</button>
              </form>
            )}

            {authTab === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3">
                <input type="email" required value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="password" required value={authPass} onChange={e => setAuthPass(e.target.value)} placeholder="Password" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="text" required value={authSecA} onChange={e => setAuthSecA(e.target.value)} placeholder="Security Answer" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                {authMsg && <p className="text-rose-400 font-bold">{authMsg}</p>}
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">Create Account</button>
              </form>
            )}

            {authTab === 'forgot' && (
              <form onSubmit={handleInstantReset} className="space-y-3">
                <input type="email" required value={resetFlowEmail} onChange={e => setResetFlowEmail(e.target.value)} placeholder="Email" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="text" required value={resetFlowSecA} onChange={e => setResetFlowSecA(e.target.value)} placeholder="Security Answer" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                <input type="password" required value={resetFlowNewPass} onChange={e => setResetFlowNewPass(e.target.value)} placeholder="New Password" className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white" />
                {resetFlowMsg && <p className="text-emerald-400 font-bold">{resetFlowMsg}</p>}
                <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-black">Reset Password</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
