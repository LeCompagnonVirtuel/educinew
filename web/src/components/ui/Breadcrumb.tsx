import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumb({ items, showHome = true, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-body-sm ${className}`}>
      {showHome && (
        <>
          <Link
            href="/dashboard"
            className="p-1 rounded text-foreground-muted hover:text-foreground transition-colors"
            aria-label="Accueil"
          >
            <Home size={14} />
          </Link>
          {items.length > 0 && <ChevronRight size={14} className="text-foreground-muted/50" />}
        </>
      )}
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-foreground-muted/50" />}
          {item.href && i < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-foreground-secondary dark:text-[var(--color-text-secondary)] hover:text-primary truncate max-w-[160px] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground dark:text-[var(--color-text-primary)] truncate max-w-[200px]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
