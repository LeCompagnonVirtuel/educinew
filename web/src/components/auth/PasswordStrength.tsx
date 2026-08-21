'use client';

import { useLanguage } from '@/hooks/useLanguage';

interface PasswordStrengthProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score: 1, label: 'Faible', color: 'bg-red-500' };
  if (score <= 3) return { score: 2, label: 'Moyen', color: 'bg-orange-500' };
  if (score <= 4) return { score: 3, label: 'Bon', color: 'bg-yellow-500' };
  if (score <= 5) return { score: 4, label: 'Fort', color: 'bg-emerald-500' };
  return { score: 5, label: 'Très fort', color: 'bg-emerald-600' };
}

function getStrengthEn(score: number): string {
  if (score <= 1) return 'Weak';
  if (score <= 2) return 'Fair';
  if (score <= 3) return 'Good';
  if (score <= 4) return 'Strong';
  return 'Very strong';
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { lang } = useLanguage();
  if (!password) return null;

  const { score, label, color } = getStrength(password);
  const displayLabel = lang === 'fr' ? label : getStrengthEn(score);

  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? color : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs mt-1.5 font-medium ${
        score <= 1 ? 'text-red-500' : score <= 2 ? 'text-orange-500' : score <= 3 ? 'text-yellow-600' : 'text-emerald-600'
      }`}>
        {displayLabel}
      </p>
    </div>
  );
}
