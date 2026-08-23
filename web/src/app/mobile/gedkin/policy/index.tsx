'use client';

import { useState, useCallback, useEffect } from 'react';

interface Policy {
  id: string;
  name: string;
  category: string;
  status: string;
  impact_score: number;
  compliance_rate: number;
  last_reviewed: string;
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Academic': return 'text-blue-600 bg-blue-50';
    case 'Financial': return 'text-green-600 bg-green-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'Security': return 'text-red-600 bg-red-50';
    case 'Operations': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'review': return 'bg-yellow-500';
    case 'draft': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
}

function getComplianceColor(rate: number): string {
  if (rate >= 0.9) return 'text-green-600';
  if (rate >= 0.8) return 'text-yellow-600';
  return 'text-red-600';
}

export default function PolicyPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [totalSimulations, setTotalSimulations] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gedkin/policy');
      if (!res.ok) throw new Error('Failed to load policies');
      const json = await res.json();
      setPolicies(json.data ?? []);
      setTotalSimulations(json.simulations ?? 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load policies</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching policy data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (policies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">No policies found</p>
          <p className="text-sm text-gray-500 mb-4">No policy data is available</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Refresh</button>
        </div>
      </div>
    );
  }

  const avgImpact = policies.length > 0
    ? (policies.reduce((sum, p) => sum + p.impact_score, 0) / policies.length * 100).toFixed(0)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Policy Intelligence</h1>
          <p className="text-sm text-gray-500">Policy compliance and impact analysis</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{policies.length}</p>
          <p className="text-xs text-gray-500">Policies</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalSimulations}</p>
          <p className="text-xs text-gray-500">Simulations</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgImpact}%</p>
          <p className="text-xs text-gray-500">Avg Impact</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Active Policies</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {policies.map((policy) => (
            <div key={policy.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(policy.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{policy.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(policy.category)}`}>
                  {policy.category}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span>Impact: {(policy.impact_score * 100).toFixed(0)}%</span>
                <span className={`font-semibold ${getComplianceColor(policy.compliance_rate)}`}>
                  Compliance: {(policy.compliance_rate * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-xs text-gray-400">Last reviewed: {policy.last_reviewed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
