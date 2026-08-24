'use client';

import { useMobileApi } from '@/hooks/useMobileApi';

export default function TransactionsPage() {
  const { data, loading, refresh } = useMobileApi({
    endpoint: '/api/reconciliation/jobs/jobs',
  });

  const stats = data.slice(0, 4).map((item: Record<string, unknown>) => ({
    label: (item.name ?? item.title ?? 'Total') as string,
    value: (item.count ?? item.total ?? item.value ?? '-') as string | number,
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
        <button
          onClick={refresh}
          disabled={loading}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50"
        >
          {loading ? 'Chargement...' : 'Rafraîchir'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-3 rounded-lg shadow-sm border animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))
        ) : (
          stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 rounded-lg shadow-sm border">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Catégories</h2>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))
        ) : (
          data.map((item: Record<string, unknown>, index: number) => (
            <div key={(item.id as string) ?? index} className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-sm font-medium text-gray-900">{(item.name ?? item.title ?? '') as string}</h3>
              <p className="text-xs text-gray-500 mt-1">{(item.description ?? item.status ?? '') as string}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
