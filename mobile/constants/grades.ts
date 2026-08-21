import { COLORS } from './colors';

export const SUBJECT_ICONS: Record<string, string> = {
  'Mathématiques': '📐', 'Maths': '📐', 'Math': '📐',
  'Français': '📝', 'Anglais': '🇬🇧', 'English': '🇬🇧',
  'Physique': '⚡', 'Physique-Chimie': '⚡',
  'SVT': '🧬', 'Sciences': '🔬', 'Biologie': '🧬',
  'Histoire': '🌍', 'Histoire-Géo': '🌍', 'Géographie': '🗺️',
  'Philosophie': '🤔', 'EPS': '⚽', 'Arts': '🎨',
  'Espagnol': '🇪🇸', 'Allemand': '🇩🇪',
  'Informatique': '💻', 'Technologie': '⚙️',
  'Économie': '📊', 'Comptabilité': '📒',
};

export function getScoreColor(score: number): string {
  if (score >= 14) return COLORS.success;
  if (score >= 10) return COLORS.warning;
  return COLORS.error;
}

export function getScoreBg(score: number): string {
  if (score >= 14) return '#ecfdf5';
  if (score >= 10) return '#fffbeb';
  return '#fef2f2';
}

export function getMention(avg: number): string {
  if (avg >= 18) return 'Excellent';
  if (avg >= 16) return 'Très Bien';
  if (avg >= 14) return 'Bien';
  if (avg >= 12) return 'Assez Bien';
  if (avg >= 10) return 'Passable';
  return 'Insuffisant';
}
