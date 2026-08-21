'use client';

import { useState } from 'react';

export default function ObservatoryPage() {
  const [stats] = useState({
    monitoredIndicators: 240,
    researchPapers: 1800,
    internationalRankings: 15,
    annualReports: 48,
    dataPartners: 32,
    globalBenchmarks: 85,
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const entities = [
    { name: 'Education Indicators', count: stats.monitoredIndicators, icon: '📈' },
    { name: 'Research Studies', count: stats.researchPapers, icon: '🔬' },
    { name: 'Ranking Reports', count: stats.annualReports, icon: '🏆' },
    { name: 'Comparative Analyses', count: 320, icon: '📊' },
    { name: 'Policy Recommendations', count: 156, icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">National Education Observatory</h1>
          <p className="text-sm text-gray-500">Research & Benchmarking Center</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-lg font-bold text-gray-900">{String(value)}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Key Entities</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {entities.map((entity) => (
            <div key={entity.name} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">{entity.icon}</span>
                <span className="text-sm text-gray-700">{entity.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{entity.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
