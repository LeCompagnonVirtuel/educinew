'use client';

import { useState, useEffect } from 'react';

interface DLPPolicy {
  id: string;
  name: string;
  enabled: boolean;
  policy_type: string;
  data_classification: string[];
  severity: string;
  applies_to: string;
}

function getClassificationColor(classification: string): string {
  switch (classification) {
    case 'RESTRICTED': return 'text-red-700 bg-red-50';
    case 'CONFIDENTIAL': return 'text-orange-700 bg-orange-50';
    case 'INTERNAL': return 'text-blue-700 bg-blue-50';
    case 'PUBLIC': return 'text-green-700 bg-green-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function DataSecurityPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<DLPPolicy[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/data-security/dlp-policies');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json = await res.json();
      setPolicies(json.data || []);
    } catch {
      setPolicies([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Security & DLP</h1>
          <p className="text-sm text-gray-500">Data protection policies</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active DLP Policies</p>
          <p className="text-lg font-bold text-teal-600">{policies.filter((p) => p.enabled).length}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Policies</p>
          <p className="text-lg font-bold text-gray-900">{policies.length}</p>
        </div>
      </div>

      {policies.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucune politique DLP trouvée</p>
        </div>
      ) : (
        <div className="space-y-3">
          {policies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-gray-900">{policy.name}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${policy.enabled ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">{policy.policy_type}</span>
                <span className="text-xs text-gray-500">Applies to: {policy.applies_to}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {policy.data_classification && policy.data_classification.map((c) => (
                  <span key={c} className={`px-2 py-0.5 rounded text-xs font-semibold ${getClassificationColor(c)}`}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
