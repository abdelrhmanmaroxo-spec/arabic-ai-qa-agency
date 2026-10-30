// ============================================================================
// STEALTH AI QA — PLATFORM CONSTANTS, PROJECTS, NDA & DEMO PAYLOADS
// ============================================================================

export const DEFAULT_SUPABASE_URL = 'https://wsomhieprlspugqotued.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indzb21oaWVwcmxzcHVncW90dWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMTA3OTUsImV4cCI6MjEwODg4Njc5NX0.2wLt7qvCm9Ko-z-3Z3-FRY1MQKpC26rowRkkytZh9Mc';

export const INITIAL_PLATFORM_CONFIG = {
  brandName: 'STEALTH AI QA',
  brandStatus: 'Pre-Launch Stealth Mode',
  tagline: 'Sovereign Arabic & Multimodal AI Data Foundry',
  regionBadge: 'AR-EG • AR-SA/AE • Levantine • S2S Voice • Financial FP&A',
  leadArchitect: 'Abdelrhman Essam Ali',
  leadTitle: 'Founder & Principal AI Systems Architect',
  heroBadge: 'Sovereign Human-in-the-Loop AI Data Infrastructure',
  heroTitleLine1: 'Eliminate Dialect Hallucinations with',
  heroTitleHighlight: 'Zero-Trust Human QA.',
  heroSubtitle:
    'We power frontier AI labs, sovereign telecoms, and financial institutions with surgical-grade Arabic Speech-to-Speech (S2S) calibration, verbatim call-center transcription, multimodal OCR annotation, and 3-statement FP&A verification—enforced by hard anti-cheat telemetry.',
  stat1Value: '99.4%',
  stat1Label: 'Inter-Annotator Agreement',
  stat2Value: '100% Human',
  stat2Label: 'Zero-AI Policy Enforced',
  stat3Value: '48 Hours',
  stat3Label: 'Diagnostic PoC SLA',
  accentColor: 'emerald',
  defaultTheme: 'dark',
  cloudUrl: DEFAULT_SUPABASE_URL,
  cloudKey: DEFAULT_SUPABASE_ANON_KEY
};

export const SPECIALIZATION_TRACKS = [
  'Arabic Speech-to-Speech (S2S) & Acoustic Diarization',
  'Verbatim Audio Transcription & Phonetic Tagging',
  'Multimodal Data Annotation, OCR & Video Timelines',
  'Financial Modeling, FP&A & Corporate RAG Audit',
  'RLHF Side-by-Side (SxS) Preference Ranking & Red-Teaming',
  'Full-Stack Software QA & OWASP Code Security'
];

export const LIVE_STUDIO_DEMOS = [
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
      response: 'Responds in rigid Modern Standard Arabic with robotic pitch flattening on "ضريبة", ignores caller urgency, and hallucinates a non-existent banking dispute portal.'
    },
    modelB: {
      name: 'Human-Calibrated S2S Gold (+3)',
      latency: '640 ms',
      factuality: 100,
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
      response: 'Computes NOPAT = $3.255M, but erroneously ADDS the $0.32M Increase in NWC instead of subtracting cash outflow, overstating enterprise FCFF at $3,225,000.'
    },
    modelB: {
      name: 'FP&A Audited Gold Output (+3)',
      latency: '780 ms',
      factuality: 100,
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
      response: 'Interpolates raw user input directly into SQL query string and leaks system instructions when subjected to multi-turn Arabic/English jailbreak framing.'
    },
    modelB: {
      name: 'Hardened Zero-Trust Patch (+3)',
      latency: '710 ms',
      factuality: 100,
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

export const INITIAL_PLATFORM_PROJECTS = [
  {
    id: 'PRJ-TRN-101',
    name: 'Audio Transcription & Speaker Diarization',
    desc: 'Egyptian, Gulf & Levantine banking call-center verbatim transcription with millisecond timestamping, overlap tags, and acoustic noise markers.',
    domain: 'Speech & Audio Operations',
    totalTasks: 1250,
    payRate: '$25 – $45 / Audio Hr',
    samplePrompt: 'Audio Clip #A-409 (Alexandrian / Cairene Banking Call): Transcribe verbatim with exact speaker turns [SPK_1], [SPK_2] and mark any acoustic hesitation: "لو سمحت أنا حولت مبلغ عن طريق إنستاباي من نص ساعة ولسه مسمعش في حساب المستفيد."'
  },
  {
    id: 'PRJ-ANN-204',
    name: 'Data Annotation, OCR & Video Timeline Labeling',
    desc: 'High-precision bounding boxes, Arabic RTL financial receipt key-value extraction, and L1/L2/L3 hierarchical action segmentation.',
    domain: 'Multimodal Computer Vision',
    totalTasks: 840,
    payRate: '$22 – $40 / Hr',
    samplePrompt: 'Document Frame #D-812 (Bilingual Commercial Invoice): Verify RTL OCR bounding polygons, extract Tax Registration ID, VAT 14% line item, and flag any character ligature corruption.'
  },
  {
    id: 'PRJ-S2S-309',
    name: 'Speech-to-Speech (S2S) Prosody Calibration',
    desc: 'Real-time duplex voice agent evaluation: grade emotional naturalness, barge-in interruption handling, and regional phonetic authenticity.',
    domain: 'Duplex Voice AI',
    totalTasks: 600,
    payRate: '$35 – $65 / Hr',
    samplePrompt: 'S2S Duplex Turn #V-190: Compare Voice Model A vs Voice Model B on interruption recovery latency and dialectal stress when the user switches mid-sentence from MSA to Gulf Arabic.'
  },
  {
    id: 'PRJ-FPA-412',
    name: 'Financial Modeling, FP&A & RAG Verification',
    desc: 'Line-by-line verification of 3-statement DCF models, WACC/FCFF derivations, IFRS/Zakat compliance, and SEC/Tadawul filing grounding.',
    domain: 'Quantitative Finance QA',
    totalTasks: 450,
    payRate: '$55 – $95 / Hr',
    samplePrompt: 'Financial Audit #F-302: Recompute EBITDA-to-FCFF bridge and verify whether the model properly accounts for deferred tax liabilities and working capital outflows.'
  },
  {
    id: 'PRJ-RLH-518',
    name: 'RLHF Preference Ranking & Red-Teaming',
    desc: 'Side-by-Side (SxS) rubric grading, factual hallucination hunting, and cultural/regulatory safety alignment across MENA dialects.',
    domain: 'Foundation Model RLHF',
    totalTasks: 920,
    payRate: '$30 – $60 / Hr',
    samplePrompt: 'SxS Rubric Task #R-615: Evaluate both candidate completions for factual grounding, dialectal register, and adherence to negative constraints. Provide an evidence-backed justification.'
  }
];

export const MASTER_CONTRACT_ARTICLES = [
  { id: '1.1', title: 'Confidentiality & Non-Disclosure Scope (NDA)', content: 'All datasets, audio files, rubrics, client identities, and evaluation prompts remain strictly confidential and proprietary.' },
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
