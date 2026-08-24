'use client';

import { useMobileApi } from '@/hooks/useMobileApi';

interface AiOsItem {
  name?: string;
  title?: string;
  label?: string;
  count?: number;
  total?: number;
  value?: string | number;
}

function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-9 w-20 bg-gray-200 rounded-lg" />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-3 rounded-xl shadow-sm">
            <div className="h-5 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 bg-gray-200 rounded-full" />
              <div className="h-4 w-36 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AiosPage() {
  const { data, loading, error, refresh } = useMobileApi<AiOsItem>({
    endpoint: '/api/integration/ai/assistants',
    transform: (items) =>
      items.map((item: Record<string, unknown>) => ({
        name: (item.name ?? item.title ?? item.label ?? 'Untitled') as string,
        value: item.count ?? item.total ?? item.value ?? '-',
      })),
  });

  if (loading) return <Skeleton />;

  const stats = data.slice(0, 3).map((item) => ({
    label: item.name ?? 'Total',
    value: item.value ?? '-',
  }));

  const entities = data.slice(0, 6).map((item) => item.name ?? 'Untitled');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">AI Operating System</h1>
        <button
          onClick={() => refresh()}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white active:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="mb-6 grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-lg font-bold text-blue-600">{String(s.value)}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">Key Entities</h2>
        <ul className="space-y-2">
          {entities.map((e) => (
            <li key={e} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
