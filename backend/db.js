const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || path.join(__dirname, 'agency.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize the 3 core tables + owner settings/questions table
db.exec(`
  CREATE TABLE IF NOT EXISTS client_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    work_email TEXT NOT NULL,
    service_needed TEXT NOT NULL,
    project_details TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS applicants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    whatsapp TEXT NOT NULL,
    specialty TEXT NOT NULL,
    nda_signed INTEGER NOT NULL DEFAULT 0,
    nda_signature_text TEXT NOT NULL,
    ip_address TEXT DEFAULT '0.0.0.0',
    mcq_score INTEGER DEFAULT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sandbox_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicant_id INTEGER NOT NULL,
    task_1_choice TEXT NOT NULL,
    task_1_rationale TEXT NOT NULL,
    task_2_notes TEXT NOT NULL,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    tab_switches INTEGER NOT NULL DEFAULT 0,
    admin_score INTEGER DEFAULT NULL,
    admin_notes TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (applicant_id) REFERENCES applicants(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS owner_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  );
`);

module.exports = db;
