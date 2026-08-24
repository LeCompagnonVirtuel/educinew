'use client';

import { useMobileApi } from '@/hooks/useMobileApi';

interface ExecutiveItem {
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
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-12 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
      <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="w-2 h-2 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExecutivePage() {
  const { data, loading, error, refresh } = useMobileApi<ExecutiveItem>({
    endpoint: '/api/global-cloud/executive',
    transform: (items) =>
      items.map((item: Record<string, unknown>) => ({
        name: (item.name ?? item.title ?? item.label ?? 'Untitled') as string,
        value: item.count ?? item.total ?? item.value ?? '-',
      })),
  });

  if (loading) return <Skeleton />;

  const stats = data.slice(0, 4).map((item) => ({
    label: item.name ?? 'Total',
    value: item.value ?? '-',
  }));

  const entities = data.slice(0, 6).map((item) => item.name ?? 'Untitled');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Executive Decision Center</h1>
        <button
          onClick={() => refresh()}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? 'Syncing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">Key Entities</h2>
      <div className="space-y-2">
        {entities.map((entity) => (
          <div key={entity} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
            <span className="text-sm text-gray-800">{entity}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
