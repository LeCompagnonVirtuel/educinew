'use client';

import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  toolbar?: React.ReactNode;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  searchKey,
  searchPlaceholder = 'Rechercher...',
  pageSize = 10,
  onRowClick,
  emptyMessage = 'Aucune donnee',
  toolbar,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const filtered = searchable && searchKey
    ? data.filter(item => String(item[searchKey]).toLowerCase().includes(search.toLowerCase()))
    : data;

  const pages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="space-y-4">
      {(searchable || toolbar) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {searchable && (
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0); }}
                className="w-full pl-9 pr-4 h-9 border border-border dark:border-[var(--color-border)] rounded-md bg-surface-bright dark:bg-[var(--color-surface)] text-foreground dark:text-[var(--color-text-primary)] text-body-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          )}
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-border dark:border-[var(--color-border)]">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="bg-surface-muted/60 dark:bg-[var(--color-surface-muted)]/60 border-b border-border dark:border-[var(--color-border)]">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`text-left px-4 py-3 font-medium text-foreground-secondary dark:text-[var(--color-text-secondary)] whitespace-nowrap ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-[var(--color-border)]">
            {paged.map((item, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-primary-50/50 dark:hover:bg-primary-500/5' : ''
                }`}
              >
                {columns.map(col => (
                  <td key={col.key} className={`px-4 py-3 text-foreground dark:text-[var(--color-text-primary)] ${col.className || ''}`}>
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-foreground-muted dark:text-[var(--color-text-muted)]">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-caption text-foreground-secondary dark:text-[var(--color-text-secondary)]">
            {filtered.length} resultat{filtered.length > 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(0)}
              disabled={page === 0}
              className="p-1.5 rounded-md hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Premiere page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded-md hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Page precedente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 text-caption font-medium text-foreground-secondary dark:text-[var(--color-text-secondary)] tabular-nums">
              {page + 1} / {pages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(pages - 1, p + 1))}
              disabled={page >= pages - 1}
              className="p-1.5 rounded-md hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Page suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(pages - 1)}
              disabled={page >= pages - 1}
              className="p-1.5 rounded-md hover:bg-surface-muted dark:hover:bg-[var(--color-surface-muted)] disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Derniere page"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
