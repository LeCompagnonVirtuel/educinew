'use client'

import { useState } from 'react'

export default function MultilangPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const stats = [
    { label: 'Languages', value: '6' },
    { label: 'Translated', value: '4' },
    { label: 'In Progress', value: '2' },
  ]

  const entities = [
    { id: 1, name: 'French', type: 'Language', status: 'Complete', progress: 100 },
    { id: 2, name: 'English', type: 'Language', status: 'Complete', progress: 100 },
    { id: 3, name: 'Wolof', type: 'Language', status: 'In Progress', progress: 72 },
    { id: 4, name: 'Bambara', type: 'Language', status: 'In Progress', progress: 45 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Multilingual</h1>
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
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{entity.name}</h3>
                <p className="text-sm text-gray-500">{entity.type}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${entity.progress}%` }} />
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ml-3 ${
                entity.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {entity.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
