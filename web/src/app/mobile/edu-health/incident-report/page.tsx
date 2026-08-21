'use client';

import { useState } from 'react';

export default function IncidentReportPage() {
  const [stats] = useState({
    totalIncidents: 230,
    openIncidents: 28,
    resolvedIncidents: 185,
    pendingInvestigation: 17,
    severityHigh: 12,
    avgResolutionTime: '2.5 days',
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const entities = [
    { name: 'Total Incidents', count: stats.totalIncidents, icon: '📋' },
    { name: 'Open', count: stats.openIncidents, icon: '📂' },
    { name: 'Resolved', count: stats.resolvedIncidents, icon: '✅' },
    { name: 'Pending Investigation', count: stats.pendingInvestigation, icon: '🔍' },
    { name: 'High Severity', count: stats.severityHigh, icon: '🔴' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Incident Report</h1>
          <p className="text-sm text-gray-500">Incident Tracking & Management</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
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
