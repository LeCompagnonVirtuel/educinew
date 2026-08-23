'use client';

import { useState, useEffect } from 'react';

interface ZeroTrustPolicy {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  enforcement_mode: 'STRICT' | 'MODERATE' | 'ADVISORY';
  zones: string[];
}

function getEnforcementColor(mode: string): string {
  switch (mode) {
    case 'STRICT': return 'text-red-700 bg-red-50';
    case 'MODERATE': return 'text-yellow-700 bg-yellow-50';
    case 'ADVISORY': return 'text-blue-700 bg-blue-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function ZeroTrustPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [policies, setPolicies] = useState<ZeroTrustPolicy[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/zero-trust/policies');
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

  const activeCount = policies.filter((p) => p.enabled).length;

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
          <h1 className="text-xl font-bold text-gray-900">Zero Trust Policies</h1>
          <p className="text-sm text-gray-500">{activeCount} active / {policies.length} total</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-red-600">{policies.length - activeCount}</p>
          <p className="text-xs text-gray-500">Disabled</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-blue-600">{policies.filter((p) => p.enforcement_mode === 'STRICT').length}</p>
          <p className="text-xs text-gray-500">Strict</p>
        </div>
      </div>

      {policies.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucune politique Zero Trust trouvée</p>
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
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEnforcementColor(policy.enforcement_mode)}`}>
                  {policy.enforcement_mode}
                </span>
                <span className="text-xs text-gray-500">Priority: {policy.priority}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {policy.zones && policy.zones.map((zone) => (
                  <span key={zone} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{zone}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
