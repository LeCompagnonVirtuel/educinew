'use client';

import { useState } from 'react';

export default function WalletOverviewPage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Solde principal', value: '2 450 000 FCFA' },
    { label: 'Solde réserve', value: '890 000 FCFA' },
    { label: 'Transactions en attente', value: '12' },
    { label: 'Dernière MAJ', value: 'Il y a 5min' },
  ];

  const entities = [
    { id: 1, name: 'Portefeuille principal', description: 'Compte opérationnel' },
    { id: 2, name: 'Portefeuille réserve', description: 'Fonds de réserve' },
    { id: 3, name: 'Portefeuille bourses', description: 'Fonds des bourses' },
    { id: 4, name: 'Portefeuille frais', description: 'Frais scolaires' },
    { id: 5, name: 'Historique soldes', description: 'Évolution des soldes' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Vue du portefeuille</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg disabled:opacity-50"
        >
          {refreshing ? 'Chargement...' : 'Rafraîchir'}
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Portefeuilles</h2>
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
