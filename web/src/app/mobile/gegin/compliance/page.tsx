'use client'

import { useMobileApi } from '@/hooks/useMobileApi'

interface ComplianceItem {
  id: number
  name: string
  type: string
  status: string
  score?: number
}

export default function CompliancePage() {
  const { data, loading, error, refresh } = useMobileApi<ComplianceItem>({
    endpoint: '/api/interoperability/governance-policies',
  })

  const stats = [
    { label: 'Total', value: data.length },
    { label: 'Compliant', value: data.filter((d) => d.status === 'Compliant').length },
    { label: 'Issues', value: data.filter((d) => d.status !== 'Compliant').length },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
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
                  <div className="text-right">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        entity.status === 'Compliant'
                          ? 'bg-green-100 text-green-800'
                          : entity.status === 'Warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {entity.status}
                    </span>
                    {entity.score != null && (
                      <p className="text-xs text-gray-400 mt-1">{entity.score}%</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
