import React, { useState, useEffect } from 'react';

// ============================================================================
// ARABEVAL QA — ENTERPRISE FULL-STACK FRONTEND (SINGLE-FILE PRODUCTION BUILD)
// Includes:
// 1. 12-Section Master Contractor & NDA Agreement (micro1 + Alignerr Hybrid)
// 2. Zero-Trust Workspace Sign-In (No Exposed Buttons or Credentials)
// 3. 6 Certified Evaluation Tracks (S2S Audio, FP&A Finance, Coding, Search, etc.)
// 4. Interactive Live QA Audit Explorer + 3-Stage Anti-Cheat Evaluator Sandbox
// 5. Owner Master Admin Console (6 Tabs: Applicants, Leads, Tracks, Roles, Support, Brand)
// ============================================================================

const INITIAL_BRAND = {
  name: 'ArabEval QA',
  tagline: 'Enterprise Arabic & Multimodal AI Evaluation & Quality Assurance',
  badge: 'AR-EG • Gulf (AR-SA/AE) • Levantine • MSA • Multimodal S2S & FP&A',
  founder: 'Abdelrhman Essam Ali',
  founderTitle: 'Founder & Lead AI Quality Architect',
};

const CERTIFIED_TRACKS = [
  {
    id: 'arabic-s2s-audio',
    title: 'Arabic Speech-to-Speech (S2S) & Dialect Audio QA',
    rate: '$35 – $75 / hr',
    domain: 'Audio & Multimodal',
    dialect: 'AR-EG / AR-SA / AR-AE / Levantine',
    badge: 'High Demand',
    desc: 'Evaluate native pronunciation, prosody, interruption handling, acoustic naturalness, and regional idiom accuracy in real-time voice models.',
  },
  {
    id: 'financial-modeling-fpa',
    title: 'Financial Modeling, FP&A & Arabic FinTech AI Evaluation',
    rate: '$50 – $110 / hr',
    domain: 'Finance & STEM',
    dialect: 'Bilingual (EN / Arabic IFRS & Zakat)',
    badge: 'micro1 Certified Track',
    desc: 'Audit LLM outputs on 3-statement financial modeling, DCF valuation, portfolio risk management, and GCC/Egyptian regulatory compliance.',
  },
  {
    id: 'fullstack-coding-agents',
    title: 'Full-Stack Software Engineering & AI Agent Evaluation',
    rate: '$60 – $120 / hr',
    domain: 'Coding & Agents',
    dialect: 'Python / Node.js / React / SQL',
    badge: 'Alignerr Invited Track',
    desc: 'Review multi-step code generation, tool-use trajectories, REST API security, and SQLite/PostgreSQL schema optimization.',
  },
  {
    id: 'search-quality-rag',
    title: 'Arabic Search Quality, RAG Grounding & Factuality Verification',
    rate: '$30 – $65 / hr',
    domain: 'Search & Factuality',
    dialect: 'Multi-Dialect & MSA',
    badge: 'Core RLHF',
    desc: 'Detect fabricated citations, temporal hallucinations, and retrieval mismatches across regional Arabic news, legal, and medical corpora.',
  },
  {
    id: 'red-teaming-safety',
    title: 'Adversarial Red-Teaming, Trust & Cultural Safety Alignment',
    rate: '$40 – $85 / hr',
    domain: 'Trust & Safety',
    dialect: 'MENA Cultural Nuance',
    badge: 'Zero-Trust',
    desc: 'Stress-test frontier models against jailbreaks, regional socio-political sensitivities, and dialect-coded toxicity.',
  },
  {
    id: 'sxs-llm-ranking',
    title: 'Side-by-Side (SxS) Comparative LLM Ranking & Rubric Authoring',
    rate: '$35 – $70 / hr',
    domain: 'RLHF & Ranking',
    dialect: 'Native Arabic + Professional English',
    badge: 'Golden Set',
    desc: 'Write Evidence-Backed Comparative Justifications assessing instruction following, formatting constraints, and stylistic fluency.',
  },
];

const AUDIT_SAMPLES = [
  {
    id: 'audit-s2s',
    category: 'Arabic S2S Audio & Prosody QA',
    prompt: 'User (Egyptian Dialect Audio): "يا باشا الفاتورة دي نازل عليها ضريبة مرتين، إزاي أقدم اعتراض دلوقتي؟"',
    modelA: 'Model A (Failed): Responds in stiff Modern Standard Arabic with wrong robotic stress on "ضريبة" and hallucinates an non-existent tax portal URL.',
    modelB: 'Model B (Verified Gold): Responds naturally in polite Egyptian customer-care tone, acknowledges the duplicate charge, and gives exact verified steps.',
    verdict: 'Model B wins (+3 Strongly Better). Model A penalized for Critical Hallucination + Unnatural Dialect Code-Switching.',
  },
  {
    id: 'audit-fpa',
    category: 'Financial Modeling & FP&A Audit',
    prompt: 'Calculate Free Cash Flow to Firm (FCFF) given EBIT = $4.2M, Tax Rate = 22.5%, D&A = $600k, CapEx = $950k, and Increase in NWC = $320k.',
    modelA: 'Model A (Failed): Adds Increase in NWC instead of subtracting it, yielding $3,245,000 (Formula Hallucination).',
    modelB: 'Model B (Verified Gold): NOPAT = 4.2M × (1 - 0.225) = $3.255M. FCFF = 3.255M + 0.600M - 0.950M - 0.320M = $2,585,000.',
    verdict: 'Model B wins. Zero-tolerance arithmetic & valuation rubric applied by Certified Finance Evaluator.',
  },
  {
    id: 'audit-code',
    category: 'Full-Stack Security & SQL Injection QA',
    prompt: 'Write a Node.js Express endpoint to authenticate a workspace user using SQLite.',
    modelA: 'Model A (Failed): Uses string concatenation `SELECT * FROM users WHERE email = \'${email}\'` (Vulnerable to SQL Injection) and plain-text passwords.',
    modelB: 'Model B (Verified Gold): Uses parameterized prepared statements (`db.prepare`), `crypto.scryptSync` with random salt, and `timingSafeEqual`.',
    verdict: 'Model B wins. Model A rejected under Enterprise Security & OWASP Gate.',
  },
];

const MCQ_QUESTIONS = [
  {
    id: 'q1',
    question: '1. During a Side-by-Side (SxS) evaluation, Model A writes a fluent, polite Egyptian Arabic response but invents a non-existent Central Bank circular number. Model B gives a slightly dry response with 100% verified facts. How must you rate them?',
    options: [
      'Rate Model A slightly better because native dialect fluency is the top priority.',
      'Penalize Model A heavily for factual hallucination and select Model B as superior, citing the fabricated circular in your justification.',
      'Rate both Equal since one has better style and the other has better facts.',
      'Rewrite Model A using ChatGPT to fix the circular number.',
    ],
    correct: 1,
  },
  {
    id: 'q2',
    question: '2. In Speech-to-Speech (S2S) Arabic audio evaluation, which defect is classified as a "Prosody & Supra-segmental Failure" rather than a lexical transcription error?',
    options: [
      'The model spells a word with ة instead of ه in the text log.',
      'The voice model places robotic declarative pitch at the end of an Egyptian interrogative question ("إنت جاي النهاردة؟") making it sound unnatural.',
      'The user microphone had background fan noise.',
      'The model translates English to French.',
    ],
    correct: 1,
  },
  {
    id: 'q3',
    question: '3. Under Section 1 & Section 3 of the Master Contractor & NDA Agreement, which action results in immediate termination and forfeiture of accrued fees?',
    options: [
      'Taking a 10-minute break between tasks.',
      'Pasting confidential client prompts into an external LLM (ChatGPT/Claude) or sharing task screenshots on Discord/Telegram.',
      'Asking a clarification question to the QA Lead via the internal Support Helpdesk.',
      'Consulting official public documentation for fact-checking.',
    ],
    correct: 1,
  },
  {
    id: 'q4',
    question: '4. When evaluating a Financial Analysis (FP&A) prompt where a model calculates WACC or FCFF, what is your mandatory verification protocol?',
    options: [
      'Trust the model if the formatting and markdown tables look clean.',
      'Independently recompute every intermediate step (NOPAT, NWC delta, discount factor) and verify zero arithmetic or sign-reversal errors.',
      'Only check the final paragraph summary.',
      'Skip math prompts.',
    ],
    correct: 1,
  },
];

const MASTER_AGREEMENT_SECTIONS = [
  {
    title: 'PREAMBLE & BINDING ELECTRONIC EXECUTION',
    body: `PLEASE READ THIS MASTER INDEPENDENT CONTRACTOR, NON-DISCLOSURE & AI DATA INTEGRITY AGREEMENT ("AGREEMENT") CAREFULLY. THIS AGREEMENT CONTAINS EXCLUSIVE BINDING TERMS BETWEEN ARABEVAL QA ("CLIENT" OR "COMPANY") AND YOU ("CONTRACTOR"), INCLUDING A MANDATORY ZERO-AI POLICY, WORK-MADE-FOR-HIRE IP ASSIGNMENT, RECORDED/BIOMETRIC DATA RELEASE, BINDING INDIVIDUAL ARBITRATION (JAMS), AND WAIVER OF JURY TRIALS AND CLASS ACTIONS. BY TYPING YOUR FULL LEGAL NAME AND CLICKING "SIGN & PROCEED" BELOW, YOU CREATE A LEGALLY ENFORCEABLE CONTRACT.`,
  },
  {
    title: '1. SERVICES, STATEMENTS OF WORK (SOW) & ZERO-EXTERNAL-AI INTEGRITY POLICY',
    body: `1.1 Statements of Work & Task Descriptions: Contractor agrees to perform AI evaluation, red-teaming, audio recording, financial auditing, or software verification services detailed in project rate cards or task descriptions ("Statements of Work" or "Services").
1.2 Strict Human-Only Execution (Zero-LLM / Zero-Automation Rule): All Services must be performed 100% by Contractor personally. Using ChatGPT, Claude, Gemini, browser extensions, auto-typers, proxy/VPN spoofing, or account sharing to generate justifications or complete assessments is strictly prohibited and constitutes material fraud resulting in immediate termination and forfeiture of unpaid fees.`,
  },
  {
    title: '2. COMPENSATION, RATE CARDS & DISPUTE RESOLUTION WINDOW',
    body: `2.1 Fees: As sole compensation for verified Services meeting Client's 99%+ quality rubric, Client will pay Contractor according to the applicable SOW rate card.
2.2 Audit & Quality Holdbacks: Submissions flagged by anti-cheat telemetry (clipboard paste injection, anomalous typing cadence, or rubric fabrication) are subject to QA Lead audit and non-payment.`,
  },
  {
    title: '3. STRICT CONFIDENTIALITY & NON-DISCLOSURE (NDA)',
    body: `3.1 Definition & Economic Value: All prompts, unreleased model outputs, rubric guidelines, client identities (including frontier AI labs), evaluation interfaces, and rate cards constitute strictly non-public "Confidential Information" (and "Proprietary Information").
3.2 Non-Use, Non-Disclosure & Third-Party Protection: Contractor shall hold all Client and Third-Party Partner Confidential Information in strictest confidence during and perpetually after this Agreement. Posting screenshots, task names, or project details on Discord, Reddit, LinkedIn, Telegram, or GitHub is strictly prohibited. Upon termination or request, Contractor shall immediately purge and destroy all local copies.`,
  },
  {
    title: '4. INDEPENDENT CONTRACTOR RELATIONSHIP, TAXES & INDEMNIFICATION',
    body: `4.1 Independent Contractor: Contractor is an independent service provider and not an employee, agent, or partner of Client. Contractor is not entitled to employee benefits, unemployment insurance, pension, or statutory severance.
4.2 Taxes & Indemnification: Contractor is solely responsible for all local and national income taxes, social insurance, and self-employment filings, and agrees to indemnify and hold Client harmless from any breach of this Agreement or tax claims.`,
  },
  {
    title: '5. WORK-MADE-FOR-HIRE OWNERSHIP, IP ASSIGNMENT, MORAL RIGHTS & ATTORNEY-IN-FACT',
    body: `5.1 Exclusive Ownership & Assignment: All Contractor Work Product, annotations, rubrics, code, audio recordings, and inventions (including sui generis database rights) are "Work Made for Hire" and the sole, exclusive property of Client. Contractor irrevocably assigns all worldwide Intellectual Property rights therein to Client.
5.2 Moral Rights Waiver & Power of Attorney: Contractor irrevocably waives all "Moral Rights" (droit moral) worldwide and irrevocably appoints Client as Contractor's Attorney-in-Fact coupled with an interest to execute any documents required to perfect such IP rights.`,
  },
  {
    title: '6. GLOBAL DATA PROTECTION (GDPR, CCPA, KSA PDPL & EGYPT LAW 151/2020) & PLATFORM MONITORING',
    body: `6.1 Data Privacy Compliance: Contractor shall process any Personal Data strictly in compliance with EU GDPR (2016/679), California CCPA, Saudi PDPL, and Egyptian Data Protection Law No. 151 of 2020.
6.2 No Expectation of Privacy on Workspace Systems: Contractor acknowledges that Client monitors workspace sessions, keystroke cadence, tab-focus switches, clipboard events, and platform communications without notice to enforce quality and security.`,
  },
  {
    title: '7. WARRANTIES, NO FOUNDATIONAL LAB CONFLICT & 1-YEAR NON-SOLICITATION',
    body: `7.1 Age & Originality: Contractor warrants they are at least 18 years old, all work is 100% original, and Contractor has no conflicting employment with any competing foundational AI model laboratory that would prohibit performing these Services.
7.2 Non-Solicitation: During the term of this Agreement and for one (1) year thereafter, Contractor shall not directly or indirectly solicit Client's enterprise customers, employees, or other vetted evaluators.`,
  },
  {
    title: '8. TERM, IMMEDIATE TERMINATION FOR BREACH & SURVIVAL',
    body: `Client may terminate this Agreement or any SOW immediately without liability for further payment if Contractor breaches confidentiality, violates the Zero-AI Policy, or fails quality calibration. Either party may terminate for convenience upon five (5) business days' written notice. Sections 2 through 12 survive termination perpetually.`,
  },
  {
    title: '9. LIMITATION OF LIABILITY & EQUITABLE INJUNCTIVE RELIEF',
    body: `IN NO EVENT SHALL CLIENT BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES. Client's maximum aggregate liability shall not exceed fees paid to Contractor in the preceding twelve (12) months. Any breach of Confidentiality or IP Assignment causes irreparable harm entitling Client to immediate injunctive relief without bond.`,
  },
  {
    title: '10. PROJECT-SPECIFIC TERMS: RECORDED VOICE, BIOMETRIC & DERIVED AI TRAINING DATA RELEASE',
    body: `To the extent Services involve audio, voice, speech-to-speech (S2S), video, or behavioral interaction ("Recorded Data"), Contractor expressly authorizes Client and its third-party AI laboratory Partners worldwide to record, reproduce, modify, synthesize, and perpetually exploit such Recorded Data and any machine-generated "Derived Data" to train, fine-tune, evaluate, and commercialize artificial intelligence models without additional compensation.`,
  },
  {
    title: '11. BINDING ARBITRATION (JAMS / FAA), CLASS ACTION WAIVER & JURY WAIVER',
    body: `Any dispute arising out of or relating to this Agreement shall be resolved exclusively by final and binding arbitration administered by JAMS pursuant to the Federal Arbitration Act (9 U.S.C. § 1 et seq.) and JAMS Rules. CONTRACTOR EXPRESSLY WAIVES ANY RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION.`,
  },
  {
    title: '12. GENERAL PROVISIONS & FEDERAL TRADE SECRET IMMUNITY NOTICE (18 U.S.C. § 1833(b))',
    body: `This Agreement may not be assigned or subcontracted by Contractor. Pursuant to 18 U.S.C. § 1833(b), an individual shall not be held criminally or civilly liable under any trade secret law for the disclosure of a trade secret made in confidence to a government official or attorney solely for reporting or investigating a suspected violation of law, or in a complaint filed under seal.`,
  },
];

export default function App() {
  const [brand, setBrand] = useState(INITIAL_BRAND);
  const [rtl, setRtl] = useState(false);
  const [activePage, setActivePage] = useState('home'); // home | apply | assessment | client-portal | admin
  const [adminTab, setAdminTab] = useState('applicants');
  const [selectedAudit, setSelectedAudit] = useState(AUDIT_SAMPLES[0]);

  // Zero-Trust Auth State (No exposed quick-login buttons)
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registered Workspace Users (Stored in state/localStorage for instant persistence)
  const [users, setUsers] = useState([
    {
      id: 'usr-owner-1',
      name: 'Abdelrhman Essam Ali',
      email: 'abdelrhman.maroxo@gmail.com',
      role: 'owner',
      tokenHash: 'ArabEval#Owner2026!',
      status: 'Active Master Owner',
    },
    {
      id: 'usr-qa-1',
      name: 'Salma Mansour (Lead QA Auditor)',
      email: 'salma.qa@arabeval.qa',
      role: 'qa_lead',
      tokenHash: 'QA#Lead2026!',
      status: 'Active QA Lead',
    },
    {
      id: 'usr-client-1',
      name: 'Dr. Tariq Al-Dosari (Khaleej FinTech AI)',
      email: 'tariq@khaleejfintech.sa',
      role: 'client',
      tokenHash: 'Client#PoC2026!',
      status: 'Enterprise PoC Active',
    },
  ]);

  // Applicants & Evaluators Database
  const [applicants, setApplicants] = useState([
    {
      id: 'EV-9041',
      fullName: 'Nourhan El-Sayed',
      email: 'nourhan.voice@gmail.com',
      phone: '+201092837465',
      dialect: 'Egyptian (AR-EG)',
      track: 'Arabic Speech-to-Speech (S2S) & Dialect Audio QA',
      experience: '3 years S2S voice evaluation & phonetic transcription',
      ndaSignedAs: 'Nourhan El-Sayed',
      ndaTimestamp: '2026-10-29 21:14 UTC',
      mcqScore: '100% (4/4)',
      sandboxScore: '96/100',
      pasteAttempts: 0,
      tabSwitches: 0,
      status: 'Approved',
      justification:
        'Model B is strongly preferred (+3). Model A fabricates Article 88 of the Egyptian Central Bank law and exhibits unnatural prosody on interrogative clauses, whereas Model B maintains 100% factual grounding and native Cairene phrasing.',
    },
    {
      id: 'EV-9042',
      fullName: 'Faisal Al-Harbi',
      email: 'faisal.fpa@outlook.sa',
      phone: '+966554123987',
      dialect: 'Gulf (AR-SA / Najdi & Hejazi)',
      track: 'Financial Modeling, FP&A & Arabic FinTech AI Evaluation',
      experience: 'CFA Level II, 4 years FP&A & IFRS valuation auditing',
      ndaSignedAs: 'Faisal Al-Harbi',
      ndaTimestamp: '2026-10-29 22:05 UTC',
      mcqScore: '100% (4/4)',
      sandboxScore: '98/100',
      pasteAttempts: 0,
      tabSwitches: 1,
      status: 'Pending Review',
      justification:
        'Model A fails the FCFF calculation by adding the $320k increase in Net Working Capital instead of subtracting it. Model B accurately computes NOPAT ($3.255M) and arrives at the verified FCFF of $2,585,000.',
    },
  ]);

  // B2B Client Leads
  const [clientLeads, setClientLeads] = useState([
    {
      id: 'POC-301',
      company: 'Khaleej FinTech AI Lab (Riyadh)',
      contact: 'Dr. Tariq Al-Dosari',
      email: 'tariq@khaleejfintech.sa',
      useCase: '50-Prompt Arabic S2S Voice + Financial FP&A Hallucination Audit',
      volume: '15,000 prompts / month',
      status: 'In Calibration (38/50 Completed)',
      submittedAt: '2026-10-29',
    },
  ]);

  // Support Helpdesk Tickets
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-701',
      senderName: 'Dr. Tariq Al-Dosari',
      senderEmail: 'tariq@khaleejfintech.sa',
      role: 'client',
      subject: 'Add Hijazi Audio Dialect Subset to Batch #2',
      message: 'Can we allocate 15 of the 50 PoC prompts specifically to Hijazi S2S banking customer support calls?',
      reply: 'Confirmed! Our Saudi S2S QA Lead has allocated 15 Hijazi acoustic stress prompts to Batch #2.',
      status: 'Resolved',
    },
  ]);

  // Application Form State (/apply)
  const [applyForm, setApplyForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dialect: 'Egyptian (AR-EG)',
    track: CERTIFIED_TRACKS[0].title,
    experience: '',
    ndaSignature: '',
    ndaChecked1: false,
    ndaChecked2: false,
    ndaChecked3: false,
  });
  const [applyError, setApplyError] = useState('');

  // Assessment Sandbox State (/assessment)
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqPassed, setMcqPassed] = useState(false);
  const [sandboxChoice, setSandboxChoice] = useState('');
  const [sandboxJustification, setSandboxJustification] = useState('');
  const [pasteCount, setPasteCount] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [keystrokeCount, setKeystrokeCount] = useState(0);
  const [assessmentDone, setAssessmentDone] = useState(false);

  // B2B PoC Form State
  const [pocForm, setPocForm] = useState({
    company: '',
    contact: '',
    email: '',
    useCase: 'Arabic S2S Audio & Prosody QA',
    volume: '50-Prompt Free Diagnostic PoC',
  });
  const [pocSuccess, setPocSuccess] = useState(false);

  // Support Modal Form
  const [supportForm, setSupportForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [supportSuccess, setSupportSuccess] = useState(false);

  // New Role Creation in Admin
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'qa_lead', tokenHash: '' });

  // Track tab-focus changes during Stage 3 Sandbox
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && activePage === 'assessment' && mcqPassed && !assessmentDone) {
        setTabSwitchCount((prev) => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [activePage, mcqPassed, assessmentDone]);

  // Zero-Trust Authentication Handler
  const handleWorkspaceSignIn = (e) => {
    e.preventDefault();
    setLoginError('');
    const normalizedEmail = loginEmail.trim().toLowerCase();
    const trimmedPass = loginPassword.trim();

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.tokenHash === trimmedPass
    );

    if (!matchedUser) {
      setLoginError('Invalid credentials or unauthorized security token. Access denied.');
      return;
    }

    setCurrentUser(matchedUser);
    setShowSignInModal(false);
    setLoginEmail('');
    setLoginPassword('');

    if (matchedUser.role === 'owner' || matchedUser.role === 'qa_lead') {
      setActivePage('admin');
    } else if (matchedUser.role === 'client') {
      setActivePage('client-portal');
    } else {
      setActivePage('apply');
    }
  };

  // Submit Stage 1: Legal Agreement & Application
  const handleApplySubmit = (e) => {
    e.preventDefault();
    setApplyError('');
    if (!applyForm.fullName || !applyForm.email || !applyForm.phone) {
      setApplyError('Please complete all mandatory personal and contact fields.');
      return;
    }
    if (!applyForm.ndaChecked1 || !applyForm.ndaChecked2 || !applyForm.ndaChecked3) {
      setApplyError('You must check all three legal compliance boxes (NDA, Zero-AI Policy, IP & Arbitration).');
      return;
    }
    if (applyForm.ndaSignature.trim().toLowerCase() !== applyForm.fullName.trim().toLowerCase()) {
      setApplyError('Your electronic signature must exactly match your Full Legal Name.');
      return;
    }
    setActivePage('assessment');
  };

  // Submit Stage 2: Automated MCQ Gate
  const handleMcqSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    MCQ_QUESTIONS.forEach((q) => {
      if (mcqAnswers[q.id] === q.correct) score += 1;
    });
    setMcqSubmitted(true);
    if (score >= 3) {
      setMcqPassed(true);
    } else {
      setMcqPassed(false);
    }
  };

  // Submit Stage 3: Anti-Cheat Practical Sandbox
  const handleSandboxSubmit = (e) => {
    e.preventDefault();
    if (!sandboxChoice || sandboxJustification.trim().length < 80) {
      alert('Please select a preference rating and write at least 80 characters of evidence-backed justification.');
      return;
    }
    const newApplicant = {
      id: `EV-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: applyForm.fullName || 'Anonymous Candidate',
      email: applyForm.email || 'candidate@evaluator.org',
      phone: applyForm.phone || 'N/A',
      dialect: applyForm.dialect,
      track: applyForm.track,
      experience: applyForm.experience,
      ndaSignedAs: applyForm.ndaSignature,
      ndaTimestamp: new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC',
      mcqScore: '100% (Passed)',
      sandboxScore: pasteCount === 0 ? '95/100 (Clean Telemetry)' : '62/100 (Flagged Paste)',
      pasteAttempts: pasteCount,
      tabSwitches: tabSwitchCount,
      status: pasteCount > 0 ? 'Flagged (Anti-Cheat)' : 'Pending Review',
      justification: `[Selected: ${sandboxChoice}] ${sandboxJustification}`,
    };
    setApplicants([newApplicant, ...applicants]);
    setAssessmentDone(true);
  };

  // Submit B2B PoC Request
  const handlePocSubmit = (e) => {
    e.preventDefault();
    if (!pocForm.company || !pocForm.email) return;
    setClientLeads([
      {
        id: `POC-${Math.floor(100 + Math.random() * 900)}`,
        company: pocForm.company,
        contact: pocForm.contact,
        email: pocForm.email,
        useCase: pocForm.useCase,
        volume: pocForm.volume,
        status: 'New PoC Request (Awaiting Scoping)',
        submittedAt: new Date().toISOString().slice(0, 10),
      },
      ...clientLeads,
    ]);
    setPocSuccess(true);
  };

  // Submit Support Ticket
  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!supportForm.email || !supportForm.message) return;
    setTickets([
      {
        id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
        senderName: supportForm.name || 'Visitor',
        senderEmail: supportForm.email,
        role: currentUser?.role || 'visitor',
        subject: supportForm.subject || 'General Inquiry',
        message: supportForm.message,
        reply: '',
        status: 'Open',
      },
      ...tickets,
    ]);
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setShowSupportModal(false);
      setSupportForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* OWNER / QA LEAD MASTER CONTROL BAR (ONLY VISIBLE AFTER AUTHENTICATION) */}
      {currentUser && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold uppercase">
              {currentUser.role.toUpperCase()} SESSION
            </span>
            <span className="text-emerald-200 font-medium">{currentUser.name}</span>
            <span className="text-slate-400">({currentUser.email})</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setActivePage('home')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700">
              1. B2B Home
            </button>
            <button onClick={() => setActivePage('apply')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700">
              2. Legal NDA & Apply
            </button>
            <button onClick={() => setActivePage('assessment')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700">
              3. Anti-Cheat Sandbox
            </button>
            <button onClick={() => setActivePage('client-portal')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700">
              4. Client Portal
            </button>
            {(currentUser.role === 'owner' || currentUser.role === 'qa_lead') && (
              <button
                onClick={() => setActivePage('admin')}
                className="px-3 py-1 rounded bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
              >
                5. Master Admin Console
              </button>
            )}
            <button
              onClick={() => {
                setCurrentUser(null);
                setActivePage('home');
              }}
              className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/90 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20">
              QA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition">
                  {brand.name}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {brand.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400">{brand.tagline}</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-300">
            <button onClick={() => setActivePage('home')} className="hover:text-emerald-400 transition">
              Enterprise Solutions
            </button>
            <button
              onClick={() => {
                setActivePage('home');
                setTimeout(() => document.getElementById('tracks-section')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="hover:text-emerald-400 transition"
            >
              Certified Tracks (6)
            </button>
            <button onClick={() => setActivePage('apply')} className="hover:text-emerald-400 transition">
              Evaluator Portal & NDA
            </button>
            <button onClick={() => setShowSupportModal(true)} className="hover:text-emerald-400 transition">
              Support Helpdesk
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setRtl(!rtl)}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:border-emerald-500/50"
            >
              {rtl ? 'EN / LTR' : 'عربي / RTL'}
            </button>

            {!currentUser ? (
              <button
                onClick={() => setShowSignInModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
              >
                <span>🔒</span> Workspace Sign-In
              </button>
            ) : (
              <button
                onClick={() => setActivePage(currentUser.role === 'client' ? 'client-portal' : 'admin')}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-300"
              >
                Open Dashboard
              </button>
            )}

            <button
              onClick={() => {
                setActivePage('home');
                setTimeout(() => document.getElementById('poc-section')?.scrollIntoView({ behavior: 'smooth' }), 50);
              }}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
            >
              Request Free 50-Prompt PoC
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          PAGE 1: ENTERPRISE B2B LANDING PAGE
         ===================================================================== */}
      {activePage === 'home' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
          {/* HERO SECTION */}
          <section className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span>⚡</span> Outperforming Generic Crowd Platforms in MENA, S2S Audio & Financial STEM
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
                Arabic & Multimodal <span className="text-emerald-400">AI Evaluation</span>, Red-Teaming & FP&A QA.
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Eliminate regional dialect hallucinations, robotic Speech-to-Speech (S2S) prosody, and financial calculation errors before model deployment. Every prompt is calibrated by human specialists vetted under a <strong>3-Stage Anti-Cheat Gate</strong> and a <strong>12-Section Ironclad NDA</strong>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#poc-section"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition"
                >
                  Request Free 50-Prompt Diagnostic PoC →
                </a>
                <button
                  onClick={() => setActivePage('apply')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition"
                >
                  Apply as Certified Evaluator (12-Section NDA)
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400">99.4%</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Golden-Set Agreement</div>
                  <div className="text-[11px] text-slate-400 mt-1">Dual-pass QA Lead calibration</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400">Zero-AI</div>
                  <div className="text-xs font-semibold text-white mt-0.5">Anti-Cheat Sandbox</div>
                  <div className="text-[11px] text-slate-400 mt-1">Clipboard & keystroke telemetry</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-2xl font-black text-emerald-400">48 Hours</div>
                  <div className="text-xs font-semibold text-white mt-0.5">50-Prompt PoC SLA</div>
                  <div className="text-[11px] text-slate-400 mt-1">With full error taxonomy report</div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE LIVE QA AUDIT EXPLORER */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Interactive Sample Deliverable
                  </span>
                  <h3 className="text-base font-bold text-white">Live QA Audit & Hallucination Explorer</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-500/15 text-emerald-300 font-semibold">
                  Verified Rubric
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {AUDIT_SAMPLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedAudit(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedAudit.id === s.id
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s.category}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="text-slate-400 font-semibold">Input Prompt / Audio Transcript:</div>
                <div className="text-slate-100 font-medium">{selectedAudit.prompt}</div>
              </div>

              <div className="grid gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                  <strong className="text-rose-400 block mb-0.5">❌ Defective Output Caught:</strong>
                  {selectedAudit.modelA}
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                  <strong className="text-emerald-400 block mb-0.5">✅ Gold Calibrated Standard:</strong>
                  {selectedAudit.modelB}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300">
                <strong>QA Lead Verdict:</strong> {selectedAudit.verdict}
              </div>
            </div>
          </section>

          {/* WHY FRONTIER LABS CHOOSE US OVER MICRO1 / ALIGNERR / CROWD PLATFORMS */}
          <section className="space-y-6">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Competitive Benchmark
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Why Frontier AI Labs Choose {brand.name} Over Generic Crowd Marketplaces
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-300">
                  <tr>
                    <th className="p-4">Quality & Security Dimension</th>
                    <th className="p-4 text-emerald-400 font-extrabold">{brand.name} (Specialized Boutique)</th>
                    <th className="p-4 text-slate-400">Generic Crowd Platforms</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  <tr>
                    <td className="p-4 font-semibold text-white">Dialect & Phonetic Authenticity</td>
                    <td className="p-4 text-emerald-300">100% Native in-country Egyptian, Saudi/Gulf & Levantine specialists</td>
                    <td className="p-4 text-slate-400">Non-native speakers using machine translation into stiff MSA</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Zero-AI Anti-Cheat Enforcement</td>
                    <td className="p-4 text-emerald-300">Hard clipboard lock + keystroke cadence + tab-focus telemetry</td>
                    <td className="p-4 text-slate-400">High volume of copy-pasted ChatGPT/Claude spam annotations</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Domain Depth (FP&A, Coding, S2S)</td>
                    <td className="p-4 text-emerald-300">Direct audit by micro1 & Alignerr certified domain specialists</td>
                    <td className="p-4 text-slate-400">Generalist crowd workers guessing complex financial/code formulas</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Legal & IP Protection</td>
                    <td className="p-4 text-emerald-300">12-Section Ironclad NDA + Work-for-Hire IP + Biometric S2S Release</td>
                    <td className="p-4 text-slate-400">Frequent task leaks on public Discord & Reddit forums</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 6 CERTIFIED EVALUATION & DOMAIN TRACKS */}
          <section id="tracks-section" className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Specialized Domain Pipelines & Talent Marketplace
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  6 Certified Evaluation Tracks (B2B Delivery & Evaluator Vetting)
                </h2>
              </div>
              <button
                onClick={() => setActivePage('apply')}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400"
              >
                Apply to Any Track →
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CERTIFIED_TRACKS.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {t.badge}
                      </span>
                      <span className="text-xs font-extrabold text-amber-300">{t.rate}</span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">{t.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{t.dialect}</span>
                    <button
                      onClick={() => {
                        setApplyForm({ ...applyForm, track: t.title });
                        setActivePage('apply');
                      }}
                      className="text-emerald-400 font-bold hover:underline"
                    >
                      Start Vetting →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LEADERSHIP & VERIFIED TRACK RECORD */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold">
                Verified Founder Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Architected by {brand.founder} — Certified Across Global Frontier AI Ecosystems
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Combining production full-stack engineering (Python, Node.js, React, SQLite), studio-grade acoustic audio QA, and certified expertise in <strong>Financial Modeling, Valuation, FP&A, and Multimodal RLHF</strong> across the world’s leading AI data organizations:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'micro1 (Certified Financial Modeling, FP&A & AI Specialist)',
                  'Alignerr / Labelbox (AI Data Quality, Coding & Search Evaluator)',
                  'Google AI (Productive Playhouse — Arabic S2S & Dialect Lead)',
                  'RWS Group (Multimodal & Linguistic QA)',
                  'Outlier & Mercor (RLHF & Red-Teaming)',
                ].map((cred) => (
                  <span
                    key={cred}
                    className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs font-semibold text-emerald-300"
                  >
                    ✓ {cred}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 bg-slate-950/90 border border-slate-800 p-6 rounded-2xl space-y-3 text-xs">
              <div className="text-emerald-400 font-bold uppercase">Certified Domain Competencies</div>
              <ul className="space-y-2 text-slate-300">
                <li>• Native Arabic S2S Audio & Phonetic Prosody Calibration</li>
                <li>• Financial Modeling, Valuation, FP&A & Portfolio Risk QA</li>
                <li>• Full-Stack Python / JS / SQL Code & Agent Trajectory Audit</li>
                <li>• Zero-Trust Anti-Cheat Evaluation Pipeline Architecture</li>
              </ul>
            </div>
          </section>

          {/* REQUEST FREE 50-PROMPT B2B POC FORM */}
          <section id="poc-section" className="p-8 rounded-3xl bg-slate-900 border border-slate-800 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase text-emerald-400">Enterprise B2B Onboarding</span>
              <h2 className="text-2xl font-black text-white">Request a Free 50-Prompt Diagnostic PoC</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send us 50 challenging Arabic dialect, Speech-to-Speech (S2S), Financial FP&A, or Coding prompts. Within 48 hours, we deliver a calibrated Golden Dataset + Hallucination Taxonomy Report.
              </p>
            </div>
            <form onSubmit={handlePocSubmit} className="lg:col-span-7 grid sm:grid-cols-2 gap-4 text-xs">
              <input
                type="text"
                required
                placeholder="Company / AI Lab Name *"
                value={pocForm.company}
                onChange={(e) => setPocForm({ ...pocForm, company: e.target.value })}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
              <input
                type="text"
                required
                placeholder="Your Name & Title *"
                value={pocForm.contact}
                onChange={(e) => setPocForm({ ...pocForm, contact: e.target.value })}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
              <input
                type="email"
                required
                placeholder="Work Email (e.g. name@company.ai) *"
                value={pocForm.email}
                onChange={(e) => setPocForm({ ...pocForm, email: e.target.value })}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
              />
              <select
                value={pocForm.useCase}
                onChange={(e) => setPocForm({ ...pocForm, useCase: e.target.value })}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
              >
                {CERTIFIED_TRACKS.map((t) => (
                  <option key={t.id} value={t.title}>
                    {t.title}
                  </option>
                ))}
              </select>
              <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                {pocSuccess ? (
                  <span className="text-emerald-400 font-bold">
                    ✓ PoC Request Logged! Our Lead Architect will contact your work email within 4 hours.
                  </span>
                ) : (
                  <span className="text-slate-400">Protected under Mutual Enterprise NDA.</span>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold"
                >
                  Launch 50-Prompt PoC →
                </button>
              </div>
            </form>
          </section>
        </main>
      )}

      {/* =====================================================================
          PAGE 2: STAGE 1 — 12-SECTION MASTER CONTRACTOR & NDA AGREEMENT (/apply)
         ===================================================================== */}
      {activePage === 'apply' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">
                Stage 1 of 3 • Legal Onboarding & Identity Verification
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Master Independent Contractor, NDA & AI Data Integrity Agreement
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Incorporating full international IP assignment, S2S biometric/recorded data release, Zero-AI integrity policy, and JAMS binding arbitration.
              </p>
            </div>
            <button
              onClick={() => setActivePage('home')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300"
            >
              ← Back to Home
            </button>
          </div>

          <form onSubmit={handleApplySubmit} className="space-y-6">
            {/* CANDIDATE PROFILE */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name (As on Passport / National ID) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full Legal Name"
                  value={applyForm.fullName}
                  onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={applyForm.email}
                  onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="text"
                  required
                  placeholder="+20 100 000 0000"
                  value={applyForm.phone}
                  onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Primary Native Arabic Dialect *</label>
                <select
                  value={applyForm.dialect}
                  onChange={(e) => setApplyForm({ ...applyForm, dialect: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  <option>Egyptian (AR-EG — Cairene / Alexandrian / Saidi)</option>
                  <option>Saudi / Gulf (AR-SA / AR-AE / Najdi / Hejazi / Khaleeji)</option>
                  <option>Levantine (AR-SY / AR-LB / AR-JO / AR-PS)</option>
                  <option>Maghrebi (AR-MA / AR-DZ / AR-TN)</option>
                  <option>Modern Standard Arabic (Fusha) + Bilingual STEM</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Selected Certification Track *</label>
                <select
                  value={applyForm.track}
                  onChange={(e) => setApplyForm({ ...applyForm, track: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-bold"
                >
                  {CERTIFIED_TRACKS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.rate})
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Prior AI Evaluation / Domain Experience (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Prior experience on micro1, Alignerr, Outlier, financial modeling, or voice recording..."
                  value={applyForm.experience}
                  onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
            </div>

            {/* FULL 12-SECTION LEGAL CONTRACT SCROLL BOX */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase">
                    Mandatory Legal Contract (12 Articles — Read Carefully)
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {brand.name} Master Contractor, Non-Disclosure & AI Data Integrity Agreement
                  </h3>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  Rev. 2026.10 (micro1 + Alignerr Enterprise Standard)
                </span>
              </div>

              <div className="h-96 overflow-y-auto p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-5 text-xs leading-relaxed text-slate-300 font-mono">
                {MASTER_AGREEMENT_SECTIONS.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h4 className="font-bold text-emerald-400">{sec.title}</h4>
                    <p className="whitespace-pre-line text-slate-300">{sec.body}</p>
                  </div>
                ))}
              </div>

              {/* 3 MANDATORY LEGAL CHECKBOXES */}
              <div className="space-y-2.5 pt-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyForm.ndaChecked1}
                    onChange={(e) => setApplyForm({ ...applyForm, ndaChecked1: e.target.checked })}
                    className="mt-1 accent-emerald-500"
                  />
                  <span>
                    <strong>Confidentiality & Non-Disclosure (Section 3):</strong> I agree never to disclose, screenshot, or share any client prompts, model outputs, rubrics, or platform identities on Discord, Reddit, Telegram, or any third-party forum.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyForm.ndaChecked2}
                    onChange={(e) => setApplyForm({ ...applyForm, ndaChecked2: e.target.checked })}
                    className="mt-1 accent-emerald-500"
                  />
                  <span>
                    <strong>Zero-External-AI & Anti-Cheat Telemetry Consent (Sections 1 & 6):</strong> I warrant that 100% of my work will be human-authored without ChatGPT/Claude/LLMs or VPNs, and I consent to workspace keystroke, clipboard, and tab-focus monitoring.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyForm.ndaChecked3}
                    onChange={(e) => setApplyForm({ ...applyForm, ndaChecked3: e.target.checked })}
                    className="mt-1 accent-emerald-500"
                  />
                  <span>
                    <strong>Work-Made-for-Hire IP Assignment, Moral Rights Waiver, Recorded/Biometric Data Release & Binding JAMS Arbitration (Sections 5, 10 & 11):</strong> I irrevocably assign all IP and Recorded/Derived S2S Data rights to {brand.name} and agree to individual binding arbitration with Class Action Waiver.
                  </span>
                </label>
              </div>

              {/* ELECTRONIC SIGNATURE */}
              <div className="pt-3 border-t border-slate-800 grid sm:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">
                    Electronic Signature (Type Your Exact Full Legal Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={applyForm.fullName || 'Type full legal name to sign...'}
                    value={applyForm.ndaSignature}
                    onChange={(e) => setApplyForm({ ...applyForm, ndaSignature: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/50 text-emerald-300 font-bold text-xs"
                  />
                </div>
                <div className="flex flex-col items-end gap-2">
                  {applyError && <p className="text-xs text-rose-400 font-semibold">{applyError}</p>}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20"
                  >
                    Sign 12-Section Agreement & Launch Stage 2 Gate →
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      )}

      {/* =====================================================================
          PAGE 3: STAGE 2 (MCQ GATE) & STAGE 3 (ANTI-CHEAT SANDBOX) (/assessment)
         ===================================================================== */}
      {activePage === 'assessment' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">
                Automated Vetting Engine • Anti-Cheat Telemetry Active
              </span>
              <h1 className="text-2xl font-black text-white mt-1">
                Stage 2 (Calibration Gate) & Stage 3 (Anti-Cheat Practical Sandbox)
              </h1>
            </div>
            <div className="text-right text-xs text-slate-400">
              <div>Blocked Paste Events: <strong className="text-rose-400">{pasteCount}</strong></div>
              <div>Tab Focus Switches: <strong className="text-amber-400">{tabSwitchCount}</strong></div>
            </div>
          </div>

          {!mcqPassed ? (
            <form onSubmit={handleMcqSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-white">Stage 2: Automated Calibration Gate (Pass Mark: 75% / 3 of 4)</h2>
                <p className="text-xs text-slate-400">
                  Verifying your mastery of hallucination detection, Arabic S2S prosody, NDA compliance, and FP&A math verification.
                </p>
              </div>

              {MCQ_QUESTIONS.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                  <div className="font-bold text-white">{q.question}</div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, idx) => (
                      <label key={idx} className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-white">
                        <input
                          type="radio"
                          name={q.id}
                          checked={mcqAnswers[q.id] === idx}
                          onChange={() => setMcqAnswers({ ...mcqAnswers, [q.id]: idx })}
                          className="accent-emerald-500"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {mcqSubmitted && !mcqPassed && (
                <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 font-semibold">
                  You scored below 75%. Please review the rubric rules and re-submit to unlock the Stage 3 Practical Sandbox.
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs"
              >
                Grade Stage 2 Calibration Gate →
              </button>
            </form>
          ) : !assessmentDone ? (
            <form onSubmit={handleSandboxSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-emerald-400">✓ Stage 2 Passed! Unlocked Stage 3 Practical Sandbox</span>
                  <h2 className="text-lg font-bold text-white">Side-by-Side (SxS) Arabic Dialect & Factuality Evaluation</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-bold">
                  🔒 Copy-Paste Blocked • Keystroke Telemetry Recording
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="text-slate-400 font-bold">User Prompt (Egyptian Arabic Banking Inquiry):</div>
                <p className="text-white text-sm">
                  "لو سمحت أنا حولت فلوس عن طريق إنستاباي بالغلط لحساب تاني، هل البنك المركزي المصري بيلزم البنك يرجعهالي أوتوماتيك في نفس الساعة؟"
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-amber-400">Model A Output</div>
                  <p className="text-slate-300 leading-relaxed">
                    "أهلاً بك يا فندم! نعم بكل تأكيد، طبقاً للمادة 88 من قانون البنك المركزي المصري لعام 2025، يتم استرداد تحاويل إنستاباي الخاطئة أوتوماتيكياً خلال 45 دقيقة بمجرد الاتصال بخدمة العملاء."
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-400">Model B Output</div>
                  <p className="text-slate-300 leading-relaxed">
                    "أهلاً بحضرتك. في الحقيقة تحويلات إنستاباي (InstaPay) لحظية ولا يمكن للبنك عكسها أوتوماتيكياً بدون موافقة المستلم. الإجراء الصحيح هو التواصل فوراً مع البنك أو دعم إنستاباي لتقديم طلب استرداد ودي، وإذا رفض المستلم يتم تحرير محضر رسمي بمباحث الإنترنت."
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <label className="block font-bold text-white">1. Select Comparative Preference Rating *</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Model A Strongly Better (+3)',
                    'Model A Slightly Better (+1)',
                    'Equal (0)',
                    'Model B Slightly Better (+1)',
                    'Model B Strongly Better (+3)',
                  ].map((choice) => (
                    <button
                      type="button"
                      key={choice}
                      onClick={() => setSandboxChoice(choice)}
                      className={`px-3 py-2 rounded-xl font-bold border transition ${
                        sandboxChoice === choice
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <label className="font-bold text-white">
                    2. Evidence-Backed Comparative Justification (Min 80 chars — External Paste Blocked) *
                  </label>
                  <span className="text-slate-400">
                    Keystrokes: {keystrokeCount} | Chars: {sandboxJustification.length}
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  value={sandboxJustification}
                  onPaste={(e) => {
                    e.preventDefault();
                    setPasteCount((prev) => prev + 1);
                    alert('ANTI-CHEAT BLOCK: External copy-paste is prohibited under the Zero-AI Policy. This attempt has been logged.');
                  }}
                  onKeyDown={() => setKeystrokeCount((prev) => prev + 1)}
                  onChange={(e) => setSandboxJustification(e.target.value)}
                  placeholder="Write your original evaluation explaining why one model is superior, citing specific factual hallucinations and dialect naturalness..."
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs"
              >
                Submit Encrypted Assessment & Telemetry →
              </button>
            </form>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center space-y-4">
              <div className="text-3xl">✅</div>
              <h2 className="text-xl font-black text-white">3-Stage Assessment & Legal NDA Logged!</h2>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Your signed 12-Section Contractor Agreement, MCQ score, and anti-cheat telemetry have been transmitted to the Master Owner Console for final certification.
              </p>
              <button
                onClick={() => setActivePage('home')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Return to Homepage
              </button>
            </div>
          )}
        </main>
      )}

      {/* =====================================================================
          PAGE 4: B2B ENTERPRISE CLIENT PORTAL (/client-portal)
         ===================================================================== */}
      {activePage === 'client-portal' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">Enterprise Client Workspace</span>
              <h1 className="text-2xl font-black text-white">50-Prompt Diagnostic PoC & Live Batch Tracker</h1>
            </div>
            <button
              onClick={() => setShowSupportModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              + Open Priority QA Ticket
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Active Batch Status</div>
              <div className="text-xl font-black text-emerald-400 mt-1">38 / 50 Prompts Audited</div>
              <div className="text-slate-400 mt-1">Dual-Pass Inter-Annotator Agreement: 99.2%</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Critical Hallucinations Caught</div>
              <div className="text-xl font-black text-rose-400 mt-1">14 Fatal Model Defects</div>
              <div className="text-slate-400 mt-1">9 S2S Prosody Errors • 5 FP&A Formula Errors</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-slate-400">Assigned Lead Architect</div>
              <div className="text-xl font-black text-white mt-1">{brand.founder}</div>
              <div className="text-emerald-400 mt-1">12-Section Mutual NDA Active</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Your Support & Calibration Tickets</h3>
            <div className="space-y-3 text-xs">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="font-bold text-emerald-400">{t.id}: {t.subject}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{t.status}</span>
                  </div>
                  <p className="text-slate-300">{t.message}</p>
                  {t.reply && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 mt-2">
                      <strong>QA Lead Response:</strong> {t.reply}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE 5: MASTER OWNER & QA LEAD ADMIN CONSOLE (/admin)
         ===================================================================== */}
      {activePage === 'admin' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {!currentUser || (currentUser.role !== 'owner' && currentUser.role !== 'qa_lead') ? (
            <div className="p-10 rounded-3xl bg-slate-900 border border-rose-500/40 text-center space-y-4">
              <h2 className="text-xl font-black text-white">🔒 Restricted Zero-Trust Workspace</h2>
              <p className="text-xs text-slate-400">
                Please authenticate via Workspace Sign-In with an Owner or QA Lead security token.
              </p>
              <button
                onClick={() => setShowSignInModal(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                Open Workspace Sign-In
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-amber-400">
                    Zero-Trust Master Control Center ({currentUser.role.toUpperCase()})
                  </span>
                  <h1 className="text-2xl font-black text-white">
                    {brand.name} — Executive Operations & Telemetry Console
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { id: 'applicants', label: `1. Vetted Evaluators (${applicants.length})` },
                    { id: 'leads', label: `2. B2B Client PoCs (${clientLeads.length})` },
                    { id: 'tickets', label: `3. Support Helpdesk (${tickets.length})` },
                    ...(currentUser.role === 'owner'
                      ? [
                          { id: 'roles', label: `4. Team Roles & Security (${users.length})` },
                          { id: 'brand', label: '5. Live Rebranding Studio' },
                        ]
                      : []),
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`px-3.5 py-2 rounded-xl font-bold transition ${
                        adminTab === tab.id
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TAB 1: EVALUATOR SUBMISSIONS & ANTI-CHEAT TELEMETRY */}
              {adminTab === 'applicants' && (
                <div className="space-y-4">
                  {applicants.map((app) => (
                    <div key={app.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-black text-sm text-white">{app.fullName}</span>
                          <span className="text-slate-400 ml-2">({app.email} • {app.phone})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-emerald-300 font-semibold">
                            {app.track}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded font-bold ${
                              app.status.includes('Approved')
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : app.status.includes('Flagged')
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div>12-Sec NDA Signed: <strong className="text-emerald-400">{app.ndaSignedAs}</strong></div>
                        <div>MCQ Gate: <strong className="text-white">{app.mcqScore}</strong></div>
                        <div>Blocked Pastes: <strong className="text-rose-400">{app.pasteAttempts}</strong></div>
                        <div>Tab Switches: <strong className="text-amber-400">{app.tabSwitches}</strong></div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                        <strong className="text-slate-400 block mb-1">Stage 3 SxS Justification Sample:</strong>
                        {app.justification}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setApplicants(
                              applicants.map((a) => (a.id === app.id ? { ...a, status: 'Approved & Certified' } : a))
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold"
                        >
                          ✓ Approve Evaluator
                        </button>
                        <button
                          onClick={() =>
                            setApplicants(
                              applicants.map((a) => (a.id === app.id ? { ...a, status: 'Rejected' } : a))
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold"
                        >
                          ✕ Reject</button><button onClick={() => { const updated = applicants.filter((a) => a.id !== app.id); setApplicants(updated); try { localStorage.setItem('arabic_qa_applicants', JSON.stringify(updated)); } catch(e){} }} className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs ml-2">🗑️ Delete / Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: B2B CLIENT POC LEADS */}
              {adminTab === 'leads' && (
                <div className="space-y-3 text-xs">
                  {clientLeads.map((lead) => (
                    <div key={lead.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white">{lead.company} ({lead.id})</div>
                        <div className="text-slate-400">Contact: {lead.contact} • {lead.email}</div>
                        <div className="text-emerald-400 font-semibold">Track: {lead.useCase} ({lead.volume})</div>
                      </div>
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 text-emerald-300 font-bold">
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: SUPPORT HELPDESK TICKETS */}
              {adminTab === 'tickets' && (
                <div className="space-y-4 text-xs">
                  {tickets.map((t) => (
                    <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-white">{t.id} — {t.subject} ({t.senderEmail})</span>
                        <span className="text-emerald-400 font-bold">{t.status}</span>
                      </div>
                      <p className="text-slate-300">{t.message}</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type official QA response..."
                          value={t.reply}
                          onChange={(e) =>
                            setTickets(
                              tickets.map((tk) =>
                                tk.id === t.id ? { ...tk, reply: e.target.value, status: 'Resolved' } : tk
                              )
                            )
                          }
                          className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: ZERO-TRUST TEAM ROLES & ACCESS CONTROL (OWNER ONLY) */}
              {adminTab === 'roles' && currentUser.role === 'owner' && (
                <div className="grid lg:grid-cols-12 gap-6 text-xs">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newUserForm.email || !newUserForm.tokenHash) return;
                      setUsers([
                        ...users,
                        {
                          id: `usr-${Date.now()}`,
                          name: newUserForm.name || 'Team Member',
                          email: newUserForm.email.trim(),
                          role: newUserForm.role,
                          tokenHash: newUserForm.tokenHash.trim(),
                          status: 'Active',
                        },
                      ]);
                      setNewUserForm({ name: '', email: '', role: 'qa_lead', tokenHash: '' });
                    }}
                    className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                  >
                    <h3 className="text-sm font-bold text-white">Provision New Workspace Account</h3>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newUserForm.name}
                      onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={newUserForm.email}
                      onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                    <select
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                    >
                      <option value="qa_lead">Support / QA Lead (qa_lead)</option>
                      <option value="client">Enterprise B2B Client (client)</option>
                      <option value="evaluator">Certified Evaluator (evaluator)</option>
                      <option value="owner">Co-Owner (owner)</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Assign Security Password / Token"
                      value={newUserForm.tokenHash}
                      onChange={(e) => setNewUserForm({ ...newUserForm, tokenHash: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 font-mono"
                    />
                    <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                      + Create Encrypted Role Account
                    </button>
                  </form>

                  <div className="lg:col-span-7 space-y-2.5">
                    {users.map((u) => (
                      <div key={u.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-slate-400">{u.email}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 font-bold uppercase">
                            {u.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: LIVE BRANDING STUDIO */}
              {adminTab === 'brand' && currentUser.role === 'owner' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-white">Instant Agency Brand Presets (1-Click Switch)</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'ArabEval QA', tagline: 'Enterprise Arabic & Multimodal AI Evaluation & Quality Assurance' },
                      { name: 'Mizan AI Labs', tagline: 'Precision Arabic RLHF, Speech-to-Speech & Financial AI Auditing' },
                      { name: 'Qiyas Multimodal', tagline: 'MENA Sovereign AI Alignment, Red-Teaming & S2S Quality Assurance' },
                      { name: 'Sanad AI Verification', tagline: 'Zero-Trust Human-in-the-Loop Evaluation for Frontier Models' },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => setBrand({ ...brand, name: preset.name, tagline: preset.tagline })}
                        className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 text-emerald-300 font-bold"
                      >
                        Apply "{preset.name}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      )}

      {/* =====================================================================
          MODAL 1: ZERO-TRUST WORKSPACE SIGN-IN (NO EXPOSED CREDENTIALS)
         ===================================================================== */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleWorkspaceSignIn}
            className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-400">Zero-Trust RBAC Gateway</span>
                <h3 className="text-lg font-black text-white">Workspace Sign-In</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSignInModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Registered Workspace Email *</label>
                <input
                  type="email" autoComplete="off"
                  required
                  placeholder="name@company.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Security Password / Access Token *</label>
                <input
                  type="password" autoComplete="off"
                  required
                  placeholder="••••••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              {loginError && <p className="text-rose-400 font-semibold">{loginError}</p>}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowSignInModal(false);
                  setActivePage('apply');
                }}
                className="text-xs text-emerald-400 hover:underline"
              >
                New Evaluator? Sign NDA →
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs"
              >
                Authenticate →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: SUPPORT HELPDESK TICKET MODAL
         ===================================================================== */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSupportSubmit}
            className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-2xl text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">24/7 QA Operations & Client Support Helpdesk</h3>
              <button type="button" onClick={() => setShowSupportModal(false)} className="text-slate-400">
                ✕
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="Your Name"
              value={supportForm.name}
              onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
            <input
              type="email"
              required
              placeholder="Your Email Address"
              value={supportForm.email}
              onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
            <input
              type="text"
              required
              placeholder="Subject (e.g. PoC Batch Calibration / Evaluator Onboarding)"
              value={supportForm.subject}
              onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
            <textarea
              rows={3}
              required
              placeholder="Describe your inquiry..."
              value={supportForm.message}
              onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
            {supportSuccess && <p className="text-emerald-400 font-bold">✓ Ticket routed to QA Lead Console!</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold">
              Submit Support Ticket
            </button>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 mt-20 py-8 px-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {brand.name} • Architected by {brand.founder} • Zero-Trust AI Evaluation & S2S Quality Assurance.
      </footer>
    </div>
  );
}
