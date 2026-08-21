/**
 * Centralized matricule utility for EduCI.
 * Official format: 8 digits + 1 uppercase letter (e.g., 16137807D)
 */

const MATRICULE_REGEX = /^\d{8}[A-Z]$/;

/**
 * Validate a matricule against the official format.
 * Returns true if valid, false otherwise.
 */
export function isValidMatricule(matricule: string): boolean {
  if (!matricule || typeof matricule !== 'string') return false;
  return MATRICULE_REGEX.test(matricule.trim());
}

/**
 * Validate and return a structured result with error message.
 */
export function validateMatricule(matricule: string): { valid: boolean; error?: string } {
  if (!matricule || typeof matricule !== 'string') {
    return { valid: false, error: 'Le matricule est requis' };
  }
  const trimmed = matricule.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Le matricule est requis' };
  }
  if (trimmed.length !== 9) {
    return { valid: false, error: `Le matricule doit contenir exactement 9 caractères (reçu: ${trimmed.length})` };
  }
  if (/\s/.test(trimmed)) {
    return { valid: false, error: 'Le matricule ne doit pas contenir d\'espaces' };
  }
  if (/[^A-Za-z0-9]/.test(trimmed)) {
    return { valid: false, error: 'Le matricule ne doit pas contenir de caractères spéciaux' };
  }
  const digits = trimmed.slice(0, 8);
  const letter = trimmed[8];
  if (!/^\d{8}$/.test(digits)) {
    return { valid: false, error: 'Les 8 premiers caractères doivent être des chiffres' };
  }
  if (!/[A-Z]/.test(letter)) {
    return { valid: false, error: 'Le dernier caractère doit être une lettre majuscule (A-Z)' };
  }
  return { valid: true };
}

/**
 * Generate a random matricule in the official format.
 * Format: 8 random digits + 1 random uppercase letter.
 * Example: 16137807D
 */
export function generateMatricule(): string {
  const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
  return `${digits}${letter}`;
}

/**
 * Generate a unique matricule by checking against existing ones.
 * Takes a function that checks if a matricule already exists.
 * Retries up to 10 times if collision occurs.
 */
export async function generateUniqueMatricule(
  existsFn: (matricule: string) => Promise<boolean>,
  maxRetries: number = 10
): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    const matricule = generateMatricule();
    const exists = await existsFn(matricule);
    if (!exists) return matricule;
  }
  throw new Error('Impossible de générer un matricule unique après plusieurs tentatives');
}

/**
 * Normalize a matricule: trim and uppercase.
 */
export function normalizeMatricule(matricule: string): string {
  return matricule.trim().toUpperCase();
}

/**
 * Check if a string looks like an old-format matricule (for migration detection).
 */
export function isOldFormatMatricule(matricule: string): boolean {
  if (!matricule) return false;
  const trimmed = matricule.trim();
  // Old formats: EDU-YYYY-NNN, EL-XXX, MAT-YYYY-XXX, ELV-YYYY-NNNNNN, etc.
  return (
    trimmed.startsWith('EDU-') ||
    trimmed.startsWith('EL-') ||
    trimmed.startsWith('MAT-') ||
    trimmed.startsWith('ELV-') ||
    trimmed.startsWith('TCH-') ||
    trimmed.startsWith('ENS-') ||
    trimmed.startsWith('PRT-') ||
    trimmed.startsWith('ADM-') ||
    trimmed.startsWith('USR-')
  );
}

/**
 * The official matricule example for placeholders and documentation.
 */
export const MATRICULE_EXAMPLE = '16137807D';
export const MATRICULE_FORMAT_DESCRIPTION = '8 chiffres suivis d\'une lettre majuscule (ex: 16137807D)';
