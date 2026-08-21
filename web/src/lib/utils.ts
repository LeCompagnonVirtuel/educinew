import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-CI', {
    style: 'currency',
    currency: 'XOF',
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

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getGradeColor(score: number, max: number = 20): string {
  const percentage = (score / max) * 100;
  if (percentage >= 75) return 'text-emerald-600';
  if (percentage >= 50) return 'text-amber-600';
  return 'text-red-600';
}

export function getGradeBg(score: number, max: number = 20): string {
  const percentage = (score / max) * 100;
  if (percentage >= 75) return 'bg-emerald-50';
  if (percentage >= 50) return 'bg-amber-50';
  return 'bg-red-50';
}
