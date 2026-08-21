'use client';

import { useState } from 'react';

export default function ReconciliationPage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Reconciliations effectuees', value: '324' },
    { label: 'Ecarts detectes', value: '7' },
    { label: 'Taux reconciliation', value: '97.8%' },
    { label: 'En attente', value: '12' },
  ];

  const entities = [
    { id: 1, name: 'Reconciliation bancaire', description: 'Rapprochement comptes banque' },
    { id: 2, name: 'Reconciliation caisse', description: 'Verification fonds physiques' },
    { id: 3, name: 'Ecarts a resoudre', description: 'Differences non expliquees' },
    { id: 4, name: 'Historique', description: 'Journal de reconciliation' },
    { id: 5, name: 'Rapports d\'ecarts', description: 'Syntheses des differences' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Reconciliation</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Operations</h2>
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
