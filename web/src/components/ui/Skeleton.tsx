interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text';
  lines?: number;
}

export default function Skeleton({ className = '', variant = 'default', lines }: SkeletonProps) {
  if (lines) {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`skeleton h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    );
  }

  const variants = {
    default: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  return <div className={`skeleton ${variants[variant]} ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-surface-bright dark:bg-[var(--color-surface)] rounded-lg border border-border dark:border-[var(--color-border)] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="skeleton w-24 h-4 rounded" />
        <div className="skeleton w-10 h-10 rounded-lg" />
      </div>
      <div className="skeleton w-32 h-8 rounded" />
      <div className="skeleton w-16 h-3 rounded" />
    </div>
  );
}
