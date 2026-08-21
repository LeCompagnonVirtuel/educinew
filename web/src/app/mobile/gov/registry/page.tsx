'use client';

import { useState } from 'react';

export default function RegistryPage() {
  const [stats] = useState({
    registeredStudents: 3150000,
    registeredTeachers: 175000,
    verifiedSchools: 12000,
    pendingVerifications: 450,
    digitalIds: 2800000,
    documentsProcessed: 4500000,
  });

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const entities = [
    { name: 'Student Records', count: stats.registeredStudents, icon: '👤' },
    { name: 'Teacher Records', count: stats.registeredTeachers, icon: '👨‍🏫' },
    { name: 'School Records', count: stats.verifiedSchools, icon: '🏫' },
    { name: 'Pending Verifications', count: stats.pendingVerifications, icon: '⏳' },
    { name: 'Digital IDs Issued', count: stats.digitalIds, icon: '🪪' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">National Education Registry</h1>
          <p className="text-sm text-gray-500">Centralized Student & Teacher Database</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-lg font-bold text-gray-900">{value.toLocaleString()}</p>
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
