'use client';

import { useMobileApi } from '@/hooks/useMobileApi';

export default function OpenDataPage() {
  const { data, loading, refresh } = useMobileApi({
    endpoint: '/api/gov/national-statistic',
  });

  const stats = data.slice(0, 6).map((item: Record<string, unknown>) => ({
    label: (item.name ?? item.title ?? item.label ?? 'Total') as string,
    value: (item.count ?? item.total ?? item.value ?? '-') as string | number,
  }));

  const entities = data.slice(0, 5).map((item: Record<string, unknown>, i: number) => ({
    name: (item.name ?? item.title ?? '') as string,
    count: (item.count ?? item.total ?? 0) as number,
    icon: ['📊', '📈', '🏗️', '💰', '🔗'][i] ?? '📋',
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Open Data Platform</h1>
          <p className="text-sm text-gray-500">Public Education Data Repository</p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-3 rounded-lg shadow-sm border animate-pulse">
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))
          : stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500 capitalize">{stat.label}</p>
                <p className="text-lg font-bold text-gray-900">{String(stat.value)}</p>
              </div>
            ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Key Entities</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))
            : entities.map((entity) => (
                <div key={entity.name} className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{entity.icon}</span>
                    <span className="text-sm text-gray-700">{entity.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{entity.count.toLocaleString()}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
