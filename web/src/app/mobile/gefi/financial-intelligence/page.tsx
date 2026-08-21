'use client';

import { useState } from 'react';

export default function FinancialIntelligencePage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Rapports generes', value: '42' },
    { label: 'Analyses IA', value: '18' },
    { label: 'Previsions precisees', value: '94%' },
    { label: 'Derniere analyse', value: 'Il y a 1h' },
  ];

  const entities = [
    { id: 1, name: 'Tableaux de bord IA', description: 'Analyses automatisees' },
    { id: 2, name: 'Previsions financieres', description: 'Projections basees sur l\'IA' },
    { id: 3, name: 'Detection d\'anomalies', description: 'Alertes intelligentes' },
    { id: 4, name: 'Rapports automatiques', description: 'Generations par DeepSeek' },
    { id: 5, name: 'Recommandations', description: 'Suggestions d\'optimisation' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Intelligence financiere</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Outils IA</h2>
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
