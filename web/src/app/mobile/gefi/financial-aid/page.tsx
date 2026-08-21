'use client';

import { useState } from 'react';

export default function FinancialAidPage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Aides actives', value: '67' },
    { label: 'Eleves assistes', value: '89' },
    { label: 'Budget alloue', value: '1 850 000 FCFA' },
    { label: 'Taux satisfaction', value: '92%' },
  ];

  const entities = [
    { id: 1, name: 'Aides financieres', description: 'Soutien monetaire direct' },
    { id: 2, name: 'Aides en nature', description: 'Fournitures et uniformes' },
    { id: 3, name: 'Aides alimentaires', description: 'Cantine et nutrition' },
    { id: 4, name: 'Aides transport', description: 'Frais de deplacement' },
    { id: 5, name: 'Demandes en cours', description: 'Validations en attente' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Aides financieres</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Types d&apos;aides</h2>
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
