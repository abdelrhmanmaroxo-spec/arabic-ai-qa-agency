// ============================================================================
// STEALTH AI QA — SEPARATED ACCOUNTS REGISTRY (NO PASSWORDS OR HASHES)
// Master Owner email is NOT stored in plaintext; bound via 'KEY-MASTER-OWNER'
// ============================================================================

export const SECURITY_QUESTIONS = [
  "What was the name of your first school?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What was your first pet's name?",
  "What is your favorite book title?"
];

export const INITIAL_ACCOUNTS_REGISTRY = [
  {
    keyId: 'KEY-SUPPORT-01',
    email: 'support@stealth-ai.agency',
    role: 'support',
    name: 'Technical Support Lead',
    certifiedForProjects: true,
    secQuestion: "What is your favorite book title?",
    secAnswer: "Clean Code",
    status: 'ACTIVE',
    isBanned: false
  },
  {
    keyId: 'KEY-EVAL-01',
    email: 'sami.evaluator@example.com',
    role: 'evaluator',
    name: 'Sami Al-Mansoor',
    certifiedForProjects: true,
    secQuestion: "What city were you born in?",
    secAnswer: "Riyadh",
    status: 'ACTIVE',
    isBanned: false
  }
];
