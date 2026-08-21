import crypto from 'crypto';

function getGatewayEncryptionKey(): string {
  const key = process.env.GATEWAY_ENCRYPTION_KEY;
  if (!key) throw new Error('GATEWAY_ENCRYPTION_KEY is required. Generate with: openssl rand -hex 32');
  return key;
}

async function getKeyBytes(keyInput: string): Promise<Uint8Array> {
  if (/^[0-9a-fA-F]{64}$/.test(keyInput)) {
    return hexToBytes(keyInput);
  }
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyInput);
  const hashBuffer = await crypto.subtle.digest('SHA-256', keyData);
  return new Uint8Array(hashBuffer);
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

export async function encrypt(text: string): Promise<string> {
  const keyBytes = await getKeyBytes(getGatewayEncryptionKey());
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, data);
  const encryptedBytes = new Uint8Array(encrypted);
  const tag = encryptedBytes.slice(-16);
  const ciphertext = encryptedBytes.slice(0, -16);
  return `${bytesToHex(iv)}:${bytesToHex(tag)}:${bytesToHex(ciphertext)}`;
}

export async function decrypt(ciphertext: string): Promise<string> {
  const parts = ciphertext.split(':');
  if (parts.length !== 3) throw new Error('Invalid ciphertext format');
  const [ivHex, tagHex, encryptedHex] = parts;
  const keyBytes = await getKeyBytes(getGatewayEncryptionKey());
  const iv = hexToBytes(ivHex);
  const tag = hexToBytes(tagHex);
  const encrypted = hexToBytes(encryptedHex);
  const combined = new Uint8Array(encrypted.length + tag.length);
  combined.set(encrypted);
  combined.set(tag, encrypted.length);
  const cryptoKey = await crypto.subtle.importKey('raw', await getKeyBytes(getGatewayEncryptionKey()), { name: 'AES-GCM' }, false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, tagLength: 128 }, cryptoKey, combined);
  return new TextDecoder().decode(decrypted);
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function maskKey(key: string): string {
  if (!key) return '';
  if (key.length <= 8) return '****';
  return key.slice(0, 4) + '****' + key.slice(-4);
}

export const SUPPORTED_GATEWAYS = [
  {
    name: 'MONEY_FUSION',
    label: 'Money Fusion',
    description: 'Paiement Mobile Money (Orange, MTN, Wave, Moov)',
    supportedMethods: ['MOBILE_MONEY'],
    supportedCurrencies: ['XOF'],
    supportedCountries: ['CI'],
  },
];

export function getConfigFieldsForGateway(gatewayName: string) {
  const gw = SUPPORTED_GATEWAYS.find(g => g.name === gatewayName);
  if (!gw) return [];
  if (gw.name === 'MONEY_FUSION') {
    return [
      { key: 'payment_url', label: 'URL de paiement Money Fusion', type: 'url', required: true, placeholder: 'https://pay.moneyfusion.net/.../pay/' },
    ];
  }
  return [];
}