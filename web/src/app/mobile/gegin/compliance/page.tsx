'use client'

import { useState } from 'react'

export default function CompliancePage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const stats = [
    { label: 'Checks', value: '56' },
    { label: 'Passed', value: '48' },
    { label: 'Failed', value: '8' },
  ]

  const entities = [
    { id: 1, name: 'Data Protection', type: 'Regulation', status: 'Compliant', score: 95 },
    { id: 2, name: 'Financial Reporting', type: 'Audit', status: 'Compliant', score: 88 },
    { id: 3, name: 'Staff Certifications', type: 'Requirement', status: 'Warning', score: 72 },
    { id: 4, name: 'Health & Safety', type: 'Regulation', status: 'Non-Compliant', score: 45 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance</h1>
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
              <div className="text-right">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  entity.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                  entity.status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {entity.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{entity.score}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
