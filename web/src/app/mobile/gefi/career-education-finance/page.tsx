'use client';

import { useState } from 'react';

export default function CareerEducationFinancePage() {
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    { label: 'Programmes finances', value: '15' },
    { label: 'Budget alloue', value: '3 400 000 FCFA' },
    { label: 'Eleves beneficiaires', value: '210' },
    { label: 'Taux reussite', value: '89%' },
  ];

  const entities = [
    { id: 1, name: 'Formation professionnelle', description: 'Financement formations' },
    { id: 2, name: 'Stages financances', description: 'Programmes de stage' },
    { id: 3, name: 'Certifications', description: 'Examens et diplomes' },
    { id: 4, name: 'Orientation professionnelle', description: 'Services d\'orientation' },
    { id: 5, name: 'Partenariats entreprises', description: 'Collaborations industrie' },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">Finance education-carriere</h1>
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
        <h2 className="text-sm font-semibold text-gray-700 uppercase">Programmes</h2>
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
