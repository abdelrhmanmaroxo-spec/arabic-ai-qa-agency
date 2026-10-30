// ============================================================================
// STEALTH AI QA — CRYPTOGRAPHIC SHADOW VAULT (ONE-WAY SHA-256 DIGESTS ONLY)
// Zero plaintext credentials stored.
// Formula: SHA-256("STEALTH_V6_VAULT_SALT::" + email.toLowerCase() + "::" + password)
// ============================================================================

export const VAULT_SALT = 'STEALTH_V6_VAULT_SALT';

// Pre-computed SHA-256 Digest for Master Owner (Zero plaintext reference)
export const MASTER_OWNER_VAULT_DIGEST =
  'fd96ac126305975ef772f61dc203efcf03d1f0a512a2254c3974762285408726';

export const INITIAL_SECURITY_VAULT = {
  'KEY-MASTER-OWNER': MASTER_OWNER_VAULT_DIGEST,
  'KEY-SUPPORT-01': 'fe2c8e0f10d9219d2b0239a7d20b673c2020b458732a4ef0112a6c734fb7500b',
  'KEY-EVAL-01': '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
};

export async function computeVaultDigest(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();
  const payload = `${VAULT_SALT}::${cleanEmail}::${cleanPass}`;
  const msgBuffer = new TextEncoder().encode(payload);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
