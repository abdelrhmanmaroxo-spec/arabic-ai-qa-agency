// ============================================================================
// STEALTH AI QA — CLOUD BACKEND SYNC, OWNER CIPHER & EXPORT SERVICES
// ============================================================================

import { MASTER_OWNER_VAULT_DIGEST, computeVaultDigest } from './securityVault';
import { SECURITY_QUESTIONS } from './accountsRegistry';
import {
  DEFAULT_SUPABASE_URL,
  DEFAULT_SUPABASE_ANON_KEY,
  MASTER_CONTRACT_ARTICLES
} from './platformConstants';

// Zero-Plaintext XOR Obfuscated Vault Vectors for Master Owner
const _OV_E = [40, 43, 45, 44, 37, 59, 33, 36, 40, 39, 103, 36, 40, 59, 38, 49, 38, 9, 46, 36, 40, 32, 37, 103, 42, 38, 36];
const _OV_P1 = [121, 120, 123, 121, 127, 122, 112, 124, 126, 125, 123, 9, 36, 4];
const _OV_P2 = [8, 59, 40, 43, 12, 63, 40, 37, 106, 6, 62, 39, 44, 59, 123, 121, 123, 127, 104];

export function decodeOwnerVector(arr) {
  return arr.map(c => String.fromCharCode(c ^ 73)).join('');
}

export function isMasterOwnerEmail(emailInput) {
  const eClean = (emailInput || '').trim().toLowerCase();
  return eClean === decodeOwnerVector(_OV_E);
}

export async function verifyIsMasterOwner(emailInput, passInput) {
  const eClean = (emailInput || '').trim().toLowerCase();
  const pClean = (passInput || '').trim();

  const expectedE = decodeOwnerVector(_OV_E);
  const expectedP1 = decodeOwnerVector(_OV_P1);
  const expectedP2 = decodeOwnerVector(_OV_P2);

  if (eClean === expectedE && (pClean === expectedP1 || pClean === expectedP2)) {
    return true;
  }

  try {
    const enteredSha = await computeVaultDigest(eClean, pClean);
    const targetSha1 = await computeVaultDigest(expectedE, expectedP1);
    const targetSha2 = await computeVaultDigest(expectedE, expectedP2);
    if (
      enteredSha === targetSha1 ||
      enteredSha === targetSha2 ||
      enteredSha === MASTER_OWNER_VAULT_DIGEST
    ) {
      return true;
    }
  } catch {}

  return false;
}

export async function fetchCloudState(brandConfig) {
  const url = (brandConfig?.cloudUrl || DEFAULT_SUPABASE_URL).trim();
  const key = (brandConfig?.cloudKey || DEFAULT_SUPABASE_ANON_KEY).trim();
  if (!url || !key) return { ok: false, status: 'Local Mode' };

  const res = await fetch(`${url}/rest/v1/stealth_cloud_state?id=eq.GLOBAL_MAIN&select=*`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });

  if (!res.ok) return { ok: false, status: 'Local + Cloud Ready' };
  const rows = await res.json();
  if (Array.isArray(rows) && rows.length > 0) {
    return { ok: true, row: rows[0], url, key, status: '☁️ Cloud Synced' };
  }
  return { ok: true, row: null, url, key, status: '☁️ Cloud Connected' };
}

export async function upsertCloudState({
  brand,
  projects,
  users,
  securityVault,
  applicants,
  tickets,
  pocs,
  resets
}) {
  const url = (brand?.cloudUrl || DEFAULT_SUPABASE_URL).trim();
  const key = (brand?.cloudKey || DEFAULT_SUPABASE_ANON_KEY).trim();
  if (!url || !key) return { ok: false, status: 'Local Mode' };

  const payload = {
    id: 'GLOBAL_MAIN',
    users_registry: users,
    security_vault: securityVault,
    applicants,
    tickets,
    pocs,
    resets,
    brand: { ...brand, customProjects: projects },
    updated_at: new Date().toISOString()
  };

  const res = await fetch(`${url}/rest/v1/stealth_cloud_state`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates'
    },
    body: JSON.stringify(payload)
  });

  return { ok: res.ok, status: res.ok ? '☁️ Cloud Synced' : 'Sync Pending' };
}

export function buildPasswordResetDispatchPackage(user, brandName) {
  const tempPass = 'Reset#' + Math.floor(100000 + Math.random() * 900000);
  const token = 'TOK-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  const resetUrl = `${window.location.origin}${window.location.pathname}`;

  const emailSubject = encodeURIComponent(`${brandName} — Password Reset & Temporary Credentials`);
  const emailBody = encodeURIComponent(
    `Hello ${user.name || user.email},\n\nYour workspace password has been reset by the Master Administrator.\n\n• Registered Email: ${user.email}\n• New Temporary Password: ${tempPass}\n• Security Token: ${token}\n• Workspace Sign-In URL: ${resetUrl}\n\nPlease sign in using the temporary password above and update your password inside your Profile & Settings.\n\n— ${brandName} Security Operations`
  );

  return {
    email: user.email,
    tempPass,
    token,
    resetUrl,
    gmailComposeUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(user.email)}&su=${emailSubject}&body=${emailBody}`,
    mailtoUrl: `mailto:${user.email}?subject=${emailSubject}&body=${emailBody}`
  };
}

export function exportSplitVaultBackup(users, securityVault) {
  const regContent = `// EXPORTED ACCOUNTS REGISTRY\nexport const SECURITY_QUESTIONS = ${JSON.stringify(SECURITY_QUESTIONS, null, 2)};\nexport const INITIAL_ACCOUNTS_REGISTRY = ${JSON.stringify(users, null, 2)};\n`;
  const vaultContent = `// EXPORTED SHA-256 SECURITY VAULT\nexport const MASTER_OWNER_VAULT_DIGEST = '${MASTER_OWNER_VAULT_DIGEST}';\nexport const INITIAL_SECURITY_VAULT = ${JSON.stringify(securityVault, null, 2)};\n`;

  const blob = new Blob([regContent + '\n' + vaultContent], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'stealth_split_vault_backup.js';
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadMasterNdaFile(brandName, currentUser) {
  const signer = currentUser ? `${currentUser.name} (${currentUser.email})` : 'Prospective Specialist';
  const text =
    `============================================================================
${brandName} — MASTER INDEPENDENT CONTRACTOR & ZERO-AI NDA AGREEMENT
Executed / Reviewed By: ${signer}
Timestamp: ${new Date().toUTCString()}
============================================================================\n\n` +
    MASTER_CONTRACT_ARTICLES.map(a => `ARTICLE ${a.id} — ${a.title}\n${a.content}\n`).join('\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${brandName.replace(/\s+/g, '_')}_Master_NDA_12_Articles.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
