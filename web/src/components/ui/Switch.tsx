'use client';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function Switch({ checked, onChange, label, description, disabled = false, size = 'md' }: SwitchProps) {
  const trackSizes = { sm: 'w-8 h-[18px]', md: 'w-10 h-[22px]' };
  const thumbSizes = { sm: 'w-3.5 h-3.5', md: 'w-4.5 h-[18px]' };
  const thumbTranslate = { sm: checked ? 'translate-x-[14px]' : 'translate-x-[2px]', md: checked ? 'translate-x-[18px]' : 'translate-x-[2px]' };

  return (
    <label className={`inline-flex items-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative flex-shrink-0 ${trackSizes[size]} rounded-full transition-colors duration-200 ${
          checked ? 'bg-primary' : 'bg-border-strong dark:bg-[var(--color-border)]'
        }`}
      >
        <span className={`absolute top-[2px] ${thumbTranslate[size]} w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200 ease-spring`} />
      </button>
      {(label || description) && (
        <div>
          {label && <span className="text-body-sm font-medium text-foreground dark:text-[var(--color-text-primary)]">{label}</span>}
          {description && <p className="text-caption text-foreground-secondary dark:text-[var(--color-text-secondary)] mt-0.5">{description}</p>}
        </div>
      )}
    </label>
  );
}
