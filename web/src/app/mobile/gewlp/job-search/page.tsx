'use client';

import { useMobileApi } from '@/hooks/useMobileApi';

export default function JobSearchPage() {
  const { data, loading, refresh } = useMobileApi({
    endpoint: '/api/employment/jobs',
  });

  const stats = data.slice(0, 3).map((item: Record<string, unknown>) => ({
    label: (item.name ?? item.title ?? item.label ?? 'Total') as string,
    value: (item.count ?? item.total ?? item.value ?? '-') as string | number,
  }));

  const entities = data.slice(0, 6).map((item: Record<string, unknown>, i: number) => ({
    name: (item.name ?? item.title ?? '') as string,
    count: (item.count ?? item.total ?? 0) as number,
    icon: ['🔍', '⚙️', '🏢', '🤝', '💾', '🔔'][i] ?? '📌',
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Job Search</h1>
        <button
          onClick={refresh}
          disabled={loading}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white active:bg-sky-700 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl bg-white p-3 shadow-sm animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            ))
          : stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-lg font-bold text-sky-600">{String(s.value)}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Search Entities</h2>
        <ul className="space-y-2">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </li>
              ))
            : entities.map((e) => (
                <li key={e.name} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  {e.name}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
