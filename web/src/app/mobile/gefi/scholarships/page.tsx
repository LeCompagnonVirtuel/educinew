'use client';

import { useState } from 'react';

export default function ScholarshipsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Bourses actives', value: '45' },
    { label: 'Beneficiaires', value: '128' },
    { label: 'Montant total', value: '3 200 000 FCFA' },
    { label: 'Taux selection', value: '34%' },
  ];

  const entities = [
    { id: 1, name: 'Bourses academiques', description: 'Excellence scolaire' },
    { id: 2, name: 'Bourses sportives', description: 'Athletes d\'excellence' },
    { id: 3, name: 'Bourses sociales', description: 'Aide aux eleves demunis' },
    { id: 4, name: 'Bourses merite', description: 'Reconnaissance du merite' },
    { id: 5, name: 'Candidatures', description: 'Demandes en cours' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Bourses</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Types de bourses</h2>
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
