/**
 * @educi/utils — Utilitaires partagés entre web et mobile.
 * Ne contient PAS de dépendances React ou UI (pas de clsx/tailwind ici).
 */

// ==================== FORMATTING ====================

export function formatCurrency(amount: number, currency = 'XOF'): string {
  return new Intl.NumberFormat('fr-CI', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date): string {
  const now = Date.now();
  const d = new Date(date).getTime();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return formatDateShort(date);
}

// ==================== STRING ====================

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// ==================== VALIDATION ====================

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s-]{8,15}$/.test(phone);
}

export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

// ==================== GRADES ====================

export function getMention(average: number): string {
  if (average >= 16) return 'Excellent';
  if (average >= 14) return 'Très Bien';
  if (average >= 12) return 'Bien';
  if (average >= 10) return 'Assez Bien';
  if (average >= 8) return 'Passable';
  return 'Insuffisant';
}

// ==================== MISC ====================

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function groupBy<T>(items: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const k = typeof key === 'function' ? key(item) : String(item[key]);
      (acc[k] ||= []).push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

export function uniqueBy<T>(items: T[], key: keyof T | ((item: T) => string)): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const k = typeof key === 'function' ? key(item) : String(item[key]);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}
