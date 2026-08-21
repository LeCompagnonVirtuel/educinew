'use client';

import { useState } from 'react';

export default function CompliancePage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Conformite globale', value: '94%' },
    { label: 'Audits effectues', value: '12' },
    { label: 'Non-conformites', value: '3' },
    { label: 'Dernier audit', value: '15/07/2026' },
  ];

  const entities = [
    { id: 1, name: 'Normes comptables', description: 'Respect des normes SYSCOHADA' },
    { id: 2, name: 'Obligations fiscales', description: 'Declarations et paiements' },
    { id: 3, name: 'Audits internes', description: 'Controles internes' },
    { id: 4, name: 'Audits externes', description: 'Controles independants' },
    { id: 5, name: 'Plan d\'action', description: 'Mesures correctives' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Conformite</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50"
        >
          {refreshing ? 'Chargement...' : 'Rafraichir'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-lg shadow-sm border">
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Domaines</h2>
        {entities.map((entity) => (
          <div key={entity.id} className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-900">{entity.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{entity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
