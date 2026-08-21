'use client'

import { useState } from 'react'

export default function IntegrationsPage() {
  const [refreshing, setRefreshing] = useState(false)

  const stats = [
    { label: 'Total Connectors', value: '24' },
    { label: 'Active', value: '18' },
    { label: 'Failed', value: '6' },
  ]

  const entities = [
    { id: 1, name: 'Google Classroom', type: 'LMS', status: 'active', lastSync: '2025-08-01' },
    { id: 2, name: 'Moodle', type: 'LMS', status: 'active', lastSync: '2025-08-01' },
    { id: 3, name: 'PowerSchool', type: 'SIS', status: 'failed', lastSync: '2025-07-28' },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Integrations</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3 border-b font-medium text-gray-700">Connectors</div>
        {entities.map((entity) => (
          <div key={entity.id} className="flex items-center justify-between p-3 border-b last:border-0">
            <div>
              <div className="font-medium text-gray-900">{entity.name}</div>
              <div className="text-xs text-gray-500">{entity.type} • Last sync: {entity.lastSync}</div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              entity.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {entity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}