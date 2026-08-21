'use client'

import { useState } from 'react'

export default function SkillsPassportPage() {
  const [refreshing, setRefreshing] = useState(false)

  const stats = [
    { label: 'Total Skills', value: '845' },
    { label: 'Certified', value: '623' },
    { label: 'In Progress', value: '222' },
  ]

  const entities = [
    { id: 1, name: 'JavaScript', category: 'Programming', level: 'Advanced', certified: true },
    { id: 2, name: 'Project Management', category: 'Management', level: 'Intermediate', certified: true },
    { id: 3, name: 'Data Analysis', category: 'Analytics', level: 'Beginner', certified: false },
  ]

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Skills Passport</h1>
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
        <div className="p-3 border-b font-medium text-gray-700">Skills</div>
        {entities.map((entity) => (
          <div key={entity.id} className="flex items-center justify-between p-3 border-b last:border-0">
            <div>
              <div className="font-medium text-gray-900">{entity.name}</div>
              <div className="text-xs text-gray-500">{entity.category} • {entity.level}</div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${
              entity.certified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {entity.certified ? 'Certified' : 'In Progress'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}