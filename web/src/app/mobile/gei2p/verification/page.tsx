'use client'

import { useState } from 'react'

export default function VerificationPage() {
  const [refreshing, setRefreshing] = useState(false)

  const stats = [
    { label: 'Total Verifications', value: '4,521' },
    { label: 'Passed', value: '4,380' },
    { label: 'Failed', value: '141' },
  ]

  const entities = [
    { id: 1, name: 'Diploma #1247', type: 'Academic', verifiedBy: 'Ministry', status: 'passed' },
    { id: 2, name: 'Certificate #892', type: 'Professional', verifiedBy: 'Coursera', status: 'passed' },
    { id: 3, name: 'Transcript #56', type: 'Academic', verifiedBy: 'University', status: 'failed' },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Verification</h1>
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
        <div className="p-3 border-b font-medium text-gray-700">Verification Requests</div>
        {entities.map((entity) => (
          <div key={entity.id} className="flex items-center justify-between p-3 border-b last:border-0">
            <div>
              <div className="font-medium text-gray-900">{entity.name}</div>
              <div className="text-xs text-gray-500">{entity.type} • {entity.verifiedBy}</div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              entity.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {entity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}