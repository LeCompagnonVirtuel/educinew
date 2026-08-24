'use client'

import { useMobileApi } from '@/hooks/useMobileApi'

interface WorkflowItem {
  id: number
  name: string
  description: string
  status: string
  count?: number
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-blue-600'
    case 'active':
      return 'bg-green-500'
    default:
      return 'bg-gray-300'
  }
}

export default function WorkflowsScreen() {
  const { data, loading, error, refresh } = useMobileApi<WorkflowItem>({
    endpoint: '/api/integration/workflows',
  })

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-extrabold text-gray-900">Workflow Orchestration</h1>
        <p className="text-sm text-gray-500 mt-1">
          {loading ? 'Loading...' : data.map((d) => d.name).join(' · ') || 'No data'}
        </p>
      </div>

      {error && (
        <div className="mx-4 mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>
      )}

      <div className="flex mx-4 mb-4 bg-white rounded-xl p-4 shadow-sm">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 text-center animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-12 mx-auto mb-1" />
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
              </div>
            ))
          : [
              { label: 'Engines', value: data.length },
              {
                label: 'Active Flows',
                value: data.reduce((a, b) => a + (b.count ?? 0), 0),
              },
              { label: 'Success Rate', value: '99.8%' },
            ].map((stat, i) => (
              <div key={i} className="flex-1 text-center">
                <div
                  className={`text-xl font-extrabold ${i === 2 ? 'text-green-500' : 'text-blue-600'}`}
                >
                  {typeof stat.value === 'number'
                    ? stat.value.toLocaleString()
                    : stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
      </div>

      <button onClick={refresh} disabled={loading} className="w-full px-4 pb-2 text-right">
        <span className="text-xs text-blue-600">{loading ? 'Refreshing...' : 'Pull to refresh'}</span>
      </button>

      <div className="px-4 space-y-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="w-2.5 h-2.5 bg-gray-200 rounded-full" />
                </div>
                <div className="h-3 bg-gray-200 rounded w-full mt-2" />
                <div className="h-3 bg-gray-200 rounded w-20 mt-2" />
              </div>
            ))
          : data.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">{item.name}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${getStatusColor(item.status)}`}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <p className="text-xs text-blue-600 mt-2 font-semibold">
                  {item.count ?? 0} active instances
                </p>
              </div>
            ))}
      </div>
    </div>
  )
}
