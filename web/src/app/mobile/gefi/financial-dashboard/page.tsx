'use client';

import { useState } from 'react';

export default function FinancialDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Revenus totaux', value: '12 450 000 FCFA' },
    { label: 'Dépenses totales', value: '8 230 000 FCFA' },
    { label: 'Solde net', value: '4 220 000 FCFA' },
    { label: 'Transactions', value: '1 284' },
  ];

  const entities = [
    { id: 1, name: 'Tableau de bord financier', description: 'Vue d\'ensemble complète' },
    { id: 2, name: 'Suivi des recettes', description: 'Encaissements et revenus' },
    { id: 3, name: 'Suivi des dépenses', description: 'Décaissements et coûts' },
    { id: 4, name: 'Rapports financiers', description: 'États financiers mensuels' },
    { id: 5, name: 'Prévisions budgétaires', description: 'Projections financières' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Tableau de bord financier</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Entités</h2>
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
