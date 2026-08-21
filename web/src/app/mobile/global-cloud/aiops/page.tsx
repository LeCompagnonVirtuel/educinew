'use client';

import { useState } from 'react';

export default function AIOpsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const stats = [
    { label: 'Auto-Resolutions', value: '2,341' },
    { label: 'Anomalies Detected', value: '189' },
    { label: 'Prediction Accuracy', value: '94.2%' },
    { label: 'MTTR Reduction', value: '67%' },
  ];

  const entities = [
    'Anomaly Detection',
    'Root Cause Analysis',
    'Auto-Remediation',
    'Capacity Planning',
    'Performance Prediction',
    'Incident Correlation',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">AIOps Autonomous Operations</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Syncing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">Key Entities</h2>
      <div className="space-y-2">
        {entities.map((entity) => (
          <div key={entity} className="bg-white p-3 rounded-lg shadow-sm flex items-center justify-between">
            <span className="text-sm text-gray-800">{entity}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
