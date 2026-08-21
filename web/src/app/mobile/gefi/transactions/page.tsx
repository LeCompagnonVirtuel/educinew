'use client';

import { useState } from 'react';

export default function TransactionsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Transactions totales', value: '1 284' },
    { label: 'En attente', value: '12' },
    { label: 'Complétées', value: '1 260' },
    { label: 'Volume mensuel', value: '4 250 000 FCFA' },
  ];

  const entities = [
    { id: 1, name: 'Transactions entrantes', description: 'Encaissements reçus' },
    { id: 2, name: 'Transactions sortantes', description: 'Décaissements effectués' },
    { id: 3, name: 'Transactions en attente', description: 'En cours de traitement' },
    { id: 4, name: 'Transactions annulées', description: 'Transactions rejetées' },
    { id: 5, name: 'Historique complet', description: 'Archive des transactions' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Transactions</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Catégories</h2>
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
