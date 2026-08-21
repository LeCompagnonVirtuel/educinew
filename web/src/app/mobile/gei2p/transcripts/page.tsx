'use client'

import { useState } from 'react'

export default function TranscriptExchangePage() {
  const [refreshing, setRefreshing] = useState(false)

  const stats = [
    { label: 'Total Transcripts', value: '2,156' },
    { label: 'Verified', value: '1,980' },
    { label: 'Pending', value: '176' },
  ]

  const entities = [
    { id: 1, student: 'Aminata Diarra', period: '2024-2025', avg: '16.5', status: 'verified' },
    { id: 2, student: 'Ibrahim Traoré', period: '2024-2025', avg: '14.2', status: 'verified' },
    { id: 3, student: 'Fatima Sow', period: '2024-2025', avg: '17.8', status: 'pending' },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Transcript Exchange</h1>
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
        <div className="p-3 border-b font-medium text-gray-700">Transcripts</div>
        {entities.map((entity) => (
          <div key={entity.id} className="flex items-center justify-between p-3 border-b last:border-0">
            <div>
              <div className="font-medium text-gray-900">{entity.student}</div>
              <div className="text-xs text-gray-500">{entity.period} • Avg: {entity.avg}</div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              entity.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {entity.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}