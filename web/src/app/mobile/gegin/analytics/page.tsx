'use client'

import { useMobileApi } from '@/hooks/useMobileApi'

interface AnalyticsItem {
  id: number
  name: string
  type: string
  frequency?: string
  status?: string
}

export default function AnalyticsPage() {
  const { data, loading, error, refresh } = useMobileApi<AnalyticsItem>({
    endpoint: '/api/analytics/dashboards/dashboards',
  })

  const stats = [
    { label: 'Total', value: data.length },
    { label: 'Reports', value: data.filter((d) => d.type === 'Report').length },
    { label: 'Dashboards', value: data.filter((d) => d.type === 'Dashboard').length },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white p-3 rounded-lg shadow animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2" />
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
              </div>
            ))
          : stats.map((stat) => (
              <div key={stat.label} className="bg-white p-3 rounded-lg shadow text-center">
                <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
      </div>

      <div className="space-y-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-16" />
                </div>
              </div>
            ))
          : data.map((entity) => (
              <div key={entity.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{entity.name}</h3>
                    <p className="text-sm text-gray-500">{entity.type}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                    {entity.frequency || entity.status || '—'}
                  </span>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
