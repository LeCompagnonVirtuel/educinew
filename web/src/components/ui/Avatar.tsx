import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const imageSizes = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

  const getInitials = (n?: string) => {
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  if (src) {
    return (
      <Image
        src={src}
        alt={alt || name || 'Avatar'}
        width={imageSizes[size]}
        height={imageSizes[size]}
        unoptimized
        className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center font-semibold text-primary flex-shrink-0 ${className}`}>
      {getInitials(name)}
    </div>
  );
}
