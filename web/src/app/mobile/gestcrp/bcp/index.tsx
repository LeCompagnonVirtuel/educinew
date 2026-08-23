'use client';

import { useState, useEffect } from 'react';

interface BCPPlan {
  id: string;
  name: string;
  status: 'DRAFT' | 'ACTIVE' | 'TESTING' | 'FAILED' | 'ARCHIVED';
  scope: string;
  last_tested_at?: string;
  next_test_at?: string;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'text-green-700 bg-green-50';
    case 'TESTING': return 'text-blue-700 bg-blue-50';
    case 'DRAFT': return 'text-gray-700 bg-gray-50';
    case 'FAILED': return 'text-red-700 bg-red-50';
    case 'ARCHIVED': return 'text-gray-500 bg-gray-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'bg-green-500';
    case 'TESTING': return 'bg-blue-500';
    case 'DRAFT': return 'bg-gray-400';
    case 'FAILED': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function BCPPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<BCPPlan[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/bcp/plans');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json = await res.json();
      setPlans(json.data || []);
    } catch {
      setPlans([]);
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

  const activePlans = plans.filter((p) => p.status === 'ACTIVE').length;

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
          <h1 className="text-xl font-bold text-gray-900">Business Continuity</h1>
          <p className="text-sm text-gray-500">Plans & Backup Status</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Plans</p>
          <p className="text-lg font-bold text-violet-600">{activePlans}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Plans</p>
          <p className="text-lg font-bold text-gray-900">{plans.length}</p>
        </div>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucun plan de continuité trouvé</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(plan.status)}`} />
                  <span className="text-base font-bold text-gray-900">{plan.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(plan.status)}`}>{plan.status}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Scope: {plan.scope}</p>
              {plan.last_tested_at && (
                <p className="text-xs text-gray-400">Last tested: {new Date(plan.last_tested_at).toLocaleDateString()}</p>
              )}
              {plan.next_test_at && (
                <p className="text-xs text-gray-400">Next test: {new Date(plan.next_test_at).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
