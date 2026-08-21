'use client'

import { useState } from 'react'

export default function MarketplacePage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const stats = [
    { label: 'Products', value: '124' },
    { label: 'Active', value: '98' },
    { label: 'Sold', value: '26' },
  ]

  const entities = [
    { id: 1, name: 'Textbooks Bundle', type: 'Physical', price: '45,000 FCFA', status: 'Active' },
    { id: 2, name: 'Online Course Access', type: 'Digital', price: '15,000 FCFA', status: 'Active' },
    { id: 3, name: 'School Uniform Set', type: 'Physical', price: '25,000 FCFA', status: 'Active' },
    { id: 4, name: 'Lab Equipment Kit', type: 'Physical', price: '120,000 FCFA', status: 'Sold Out' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
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
                <p className="text-sm font-medium text-green-600">{entity.price}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                entity.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {entity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
