'use client';

import { useState, useEffect, useCallback } from 'react';

interface PolicyItem {
  id: string;
  name: string;
  category: string;
  status: 'compliant' | 'review_needed' | 'non_compliant';
  last_audit: string;
  next_audit: string;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'compliant': return 'bg-green-500';
    case 'review_needed': return 'bg-yellow-500';
    case 'non_compliant': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'compliant': return 'text-green-600 bg-green-50';
    case 'review_needed': return 'text-yellow-600 bg-yellow-50';
    case 'non_compliant': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Privacy': return 'text-blue-600 bg-blue-50';
    case 'Ethics': return 'text-purple-600 bg-purple-50';
    case 'Governance': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function GovernanceEthicsPage() {
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/governance-ethics');
      if (res.ok) {
        const data = await res.json();
        setPolicies(Array.isArray(data) ? data : data.policies ?? []);
      }
    } catch {
      setPolicies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const compliantCount = policies.filter((p) => p.status === 'compliant').length;
  const complianceRate = policies.length > 0
    ? Math.round((compliantCount / policies.length) * 100)
    : 0;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    fetchData().finally(() => setRefreshing(false));
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Governance & Ethics</h1>
          <p className="text-sm text-gray-500">Policy compliance dashboard</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {policies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700">Compliance Score</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${complianceRate >= 90 ? 'text-green-600 bg-green-50' : complianceRate >= 70 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
                {complianceRate >= 90 ? 'COMPLIANT' : complianceRate >= 70 ? 'REVIEW' : 'AT RISK'}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-extrabold ${complianceRate >= 90 ? 'text-green-600' : complianceRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>{complianceRate}</span>
              <span className="text-sm text-gray-500 mb-1">%</span>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${complianceRate >= 90 ? 'bg-green-500' : complianceRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${complianceRate}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-green-600">{compliantCount}</p>
              <p className="text-xs text-gray-500">Compliant</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-yellow-600">{policies.filter((p) => p.status === 'review_needed').length}</p>
              <p className="text-xs text-gray-500">Review</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-red-600">{policies.filter((p) => p.status === 'non_compliant').length}</p>
              <p className="text-xs text-gray-500">Non-compliant</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Policy Registry</h2>
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
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                      {policy.status.replace('_', ' ')}
                    </span>
                    <span>Last audit: {policy.last_audit}</span>
                    <span>&middot;</span>
                    <span>Next: {policy.next_audit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
