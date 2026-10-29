# ArabEval QA — Arabic & Multimodal AI Evaluation & QA Agency

Full-stack B2B AI Evaluation & Quality Assurance platform and automated 3-Stage Evaluator Assessment & Anti-Cheat Vetting Portal, architected by **Abdelrhman Essam Ali** (`@abdelrhmanmaroxo-spec`).

## 1. Tech Stack & Architecture
- **Frontend (`/frontend`)**: React 19 + Vite + Tailwind CSS, supporting English & Arabic (`RTL`/`LTR`) layouts, deployed automatically to **GitHub Pages**.
- **Backend (`/backend`)**: Node.js + Express REST APIs with **SQLite (`agency.db`)**, deployed on **Railway**.
- **Security & Protection**:
  - **Input Validation**: Strict server-side sanitization and schema checks on all endpoints.
  - **Rate Limiting**: IP-based rate limiting on lead submission, applicant registration, and admin endpoints to block spam/DDoS.
  - **CORS & RBAC**: Configured CORS origins and Role-Based Access Control (`x-admin-key` / Bearer token) protecting `/api/admin/*` routes.

## 2. Application Routes
- `/` — **B2B Landing Page** (English-first with AR/EN toggle):
  1. **Hero Section**: Arabic & Multimodal AI Evaluation & QA (Hallucination Detection, Instruction Following, Speech-to-Speech Testing) + **Request Free 50-Prompt PoC** modal.
  2. **Core Services**: LLM Evaluation & Ranking, Speech-to-Speech & Multimodal QA, Trust, Safety & Fact-Checking, and AI Agent Evaluation.
  3. **Our QA Pipeline**: 3-step visual workflow (Vetted Native Linguists → Automated & Human Error Analysis → Evidence-Based QA Reporting).
  4. **Leadership & Track Record**: Led by Abdelrhman Essam Ali, with hands-on AI evaluation experience across **Google AI (with Productive Playhouse)**, **RWS Group**, and **Outlier**.
  5. **Footer & Evaluator Portal Link**: Official contact info (`abdelrhman.maroxo@gmail.com` | `+20 128 014 8598`) and **Join Our Evaluator Squad** (`/apply`).
- `/apply` — **Stage 1: Evaluator Onboarding & Electronic NDA**:
  - Captures Full Name, Email, WhatsApp, and Dialect/Domain Specialty.
  - Scrollable Non-Disclosure Agreement (NDA) box prohibiting data sharing or external AI/LLM usage.
  - Unlocks assessment only after checkbox consent + full 3-part electronic signature, logged with IP address and timestamp.
- `/assessment` — **Stage 2 & Stage 3: Timed Vetting & Practical Sandbox**:
  - **Stage 2 (Auto-Graded Gatekeeper)**: 5 multiple-choice questions in 10 minutes (Hallucination Detection, Negative Constraints without letter 'و', Egyptian Dialect Consistency, Trust & Safety Policy Compliance, Rubric Scoring). Applicants scoring `< 4/5` are automatically filtered out.
  - **Stage 3 (Practical Sandbox — 25 Minutes)**:
    - **Task 1 (Side-by-Side Ranking & Rationale)**: Complex prompt with Model A (polished formatting but contains a subtle factual hallucination) vs. Model B (concise, 100% accurate, follows all negative constraints). Requires Likert ranking and English rationale with Evidence Verification.
    - **Task 2 (Speech/Audio QA Evaluation)**: 20-second Egyptian Arabic (`AR-EG`) synthesized voice clip containing a deliberate pronunciation/prosody flaw at `00:11`. Evaluators rate Naturalness, Dialect Consistency, and pinpoint the exact second and defective word.
  - **Anti-Cheat Engine**:
    - Disables Copy, Paste, Cut, and Context Menu (`onPaste`, `onCopy`, `onCut`, `onContextMenu`) inside rationale textareas.
    - Tracks total time spent (`time_spent_seconds`) and flags submissions completed in `< 60 seconds` in red on the Admin Dashboard.
    - Tracks browser tab switches via `document.addEventListener('visibilitychange')` (`tab_switches`).
- `/admin` — **Secret Admin Dashboard (RBAC Protected)**:
  - Review B2B Client PoC Leads (`client_leads`).
  - Inspect Evaluator Applications (`applicants`) & Sandbox Submissions (`sandbox_submissions`) with red anti-cheat alerts (`< 60s` speed warning & tab-switch counters), assign `admin_score` and `admin_notes`, and set applicant status (`approved` / `rejected` / `pending`).

## 3. SQLite Database Schema (`agency.db`)
- **`client_leads`**: `id, company_name, contact_name, work_email, service_needed, project_details, created_at`
- **`applicants`**: `id, full_name, email, whatsapp, specialty, nda_signed, nda_signature_text, ip_address, mcq_score, status, created_at`
- **`sandbox_submissions`**: `id, applicant_id, task_1_choice, task_1_rationale, task_2_notes, time_spent_seconds, tab_switches, admin_score, admin_notes, created_at`

## 4. Quick Start & Deployment
```bash
# 1. Start Backend (Node.js + SQLite)
cd backend
npm install
ADMIN_SECRET_KEY="arabeval-admin-2026" PORT=4000 npm start

# 2. Start Frontend (React 19 + Vite)
cd ../frontend
npm install
npm run dev
```
