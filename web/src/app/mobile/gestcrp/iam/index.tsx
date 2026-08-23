'use client';

import { useState, useEffect } from 'react';

interface IAMPolicy {
  id: string;
  name: string;
  enabled: boolean;
  effect: 'ALLOW' | 'DENY';
  subjects: string[];
  resources: string[];
  priority: number;
}

function getEffectColor(effect: string): string {
  return effect === 'ALLOW' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50';
}

export default function IAMPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<IAMPolicy[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/iam/policies');
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
          <h1 className="text-xl font-bold text-gray-900">IAM Policies</h1>
          <p className="text-sm text-gray-500">Identity & Access Management</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Policies</p>
          <p className="text-lg font-bold text-purple-600">{policies.length}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Policies</p>
          <p className="text-lg font-bold text-green-600">{policies.filter((p) => p.enabled).length}</p>
        </div>
      </div>

      {policies.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucune politique IAM trouvée</p>
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
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEffectColor(policy.effect)}`}>{policy.effect}</span>
                <span className="text-xs text-gray-500">Priority: {policy.priority}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {policy.subjects && policy.subjects.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">{s}</span>
                ))}
                <span className="text-xs text-gray-400 mx-1">→</span>
                {policy.resources && policy.resources.map((r) => (
                  <span key={r} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
