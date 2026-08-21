'use client';

interface EduCILogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
  showSlogan?: boolean;
}

const sizes = {
  xs: { icon: 24, text: 'text-sm', gap: 'gap-1.5', slogan: 'text-[8px]' },
  sm: { icon: 32, text: 'text-lg', gap: 'gap-2', slogan: 'text-[9px]' },
  md: { icon: 40, text: 'text-xl', gap: 'gap-2.5', slogan: 'text-[10px]' },
  lg: { icon: 48, text: 'text-2xl', gap: 'gap-3', slogan: 'text-xs' },
  xl: { icon: 56, text: 'text-3xl', gap: 'gap-3.5', slogan: 'text-sm' },
};

function LogoIcon({ size = 40 }: { size?: number }) {
  const id = `educi-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F77F00"/>
          <stop offset="50%" stopColor="#009E60"/>
          <stop offset="100%" stopColor="#F77F00"/>
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.2)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={`url(#${id}-grad)`}/>
      <rect x="4" y="4" width="56" height="56" rx="14" fill={`url(#${id}-shine)`}/>
      <path d="M20 18h24c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H26v6h12c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H26v6h18c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H20c-1.1 0-2-.9-2-2V20c0-1.1.9-2 2-2z" fill="white"/>
    </svg>
  );
}

export default function EduCILogo({ variant = 'full', size = 'md', theme = 'light', className = '', showSlogan = false }: EduCILogoProps) {
  const s = sizes[size];
  const textColor = theme === 'dark' ? 'text-white' : 'text-[#1E3A5F]';

  if (variant === 'icon') {
    return (
      <div className={className}>
        <LogoIcon size={s.icon} />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className={`font-display font-extrabold ${s.text} leading-none`}>
          <span className={textColor}>Edu</span>
          <span className="text-[#FF8A00]">CI</span>
        </span>
        {showSlogan && (
          <span className={`${s.slogan} text-slate-500 font-medium mt-0.5`}>La gestion scolaire intelligente</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <LogoIcon size={s.icon} />
      <div className="flex flex-col">
        <span className={`font-display font-extrabold ${s.text} leading-none`}>
          <span className={textColor}>Edu</span>
          <span className="text-[#FF8A00]">CI</span>
        </span>
        {showSlogan && (
          <span className={`${s.slogan} text-slate-500 font-medium mt-0.5`}>La gestion scolaire intelligente</span>
        )}
      </div>
    </div>
  );
}
