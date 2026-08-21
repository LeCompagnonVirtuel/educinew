'use client'

import { useState } from 'react'

export default function OrganizationsPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const stats = [
    { label: 'Organizations', value: '8' },
    { label: 'Partners', value: '5' },
    { label: 'Affiliated', value: '3' },
  ]

  const entities = [
    { id: 1, name: 'Ministry of Education', type: 'Government', status: 'Partner' },
    { id: 2, name: 'UNESCO Regional Office', type: 'International', status: 'Partner' },
    { id: 3, name: 'West African Exams Council', type: 'Examination', status: 'Affiliated' },
    { id: 4, name: 'National Teachers Union', type: 'Professional', status: 'Member' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
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
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                {entity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
