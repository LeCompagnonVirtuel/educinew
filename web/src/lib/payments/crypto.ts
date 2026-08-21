import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

function getKey(): Buffer {
  const secret = process.env.CREDENTIALS_ENCRYPTION_KEY;
  if (!secret) throw new Error('CREDENTIALS_ENCRYPTION_KEY not configured');
  return Buffer.from(secret, 'hex');
}

export function encrypt(plaintext: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

export function decrypt(ciphertext: string): string {
  const key = getKey();
  const parts = ciphertext.split(':');
  if (parts.length !== 3) throw new Error('Invalid ciphertext format');
  const [ivHex, tagHex, encrypted] = parts;
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function encryptCredentials(credentials: Record<string, string>): Record<string, string> {
  const encrypted: Record<string, string> = {};
  for (const [key, value] of Object.entries(credentials)) {
    if (value && typeof value === 'string' && value.length > 0) {
      encrypted[key] = encrypt(value);
    }
  }
  return encrypted;
}

export function decryptCredentials(encrypted: Record<string, string>): Record<string, string> {
  const decrypted: Record<string, string> = {};
  for (const [key, value] of Object.entries(encrypted)) {
    if (value && typeof value === 'string') {
      decrypted[key] = decrypt(value);
    }
  }
  return decrypted;
}

export function maskKey(key: string): string {
  if (!key || key.length < 8) return '****';
  return `${key.slice(0, 4)}${'*'.repeat(key.length - 8)}${key.slice(-4)}`;
}
