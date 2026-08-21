'use client'

import { useState } from 'react'

export default function IdentityPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const stats = [
    { label: 'Students', value: '1,247' },
    { label: 'Staff', value: '89' },
    { label: 'Pending', value: '12' },
  ]

  const entities = [
    { id: 1, name: 'Student ID Cards', type: 'Document', count: 1247 },
    { id: 2, name: 'Staff Badges', type: 'Document', count: 89 },
    { id: 3, name: 'Visitor Passes', type: 'Document', count: 156 },
    { id: 4, name: 'Digital Certificates', type: 'Credential', count: 342 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Identity</h1>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {entities.map((entity) => (
          <div key={entity.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{entity.name}</h3>
                <p className="text-sm text-gray-500">{entity.type}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                {entity.count.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
