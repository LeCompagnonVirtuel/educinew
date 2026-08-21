'use client';

import { useState, useCallback } from 'react';
import { usePolicies, usePolicySimulations } from '@/features/gedkin/hooks';

interface Policy {
  id: string;
  name: string;
  category: string;
  status: string;
  impact_score: number;
  compliance_rate: number;
  last_reviewed: string;
}

const FALLBACK_POLICIES: Policy[] = [
  { id: '1', name: 'Student Attendance Policy', category: 'Academic', status: 'active', impact_score: 0.88, compliance_rate: 0.92, last_reviewed: '2026-07-15' },
  { id: '2', name: 'Fee Payment Guidelines', category: 'Financial', status: 'active', impact_score: 0.82, compliance_rate: 0.87, last_reviewed: '2026-06-20' },
  { id: '3', name: 'Teacher Evaluation Framework', category: 'HR', status: 'active', impact_score: 0.91, compliance_rate: 0.78, last_reviewed: '2026-08-01' },
  { id: '4', name: 'Data Privacy Compliance', category: 'Security', status: 'review', impact_score: 0.95, compliance_rate: 0.96, last_reviewed: '2026-07-28' },
  { id: '5', name: 'Transport Safety Standards', category: 'Operations', status: 'active', impact_score: 0.87, compliance_rate: 0.83, last_reviewed: '2026-05-10' },
];

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
  const policiesQuery = usePolicies('current-school');
  const simulationsQuery = usePolicySimulations('current-school');

  const isLoading = policiesQuery.isLoading || simulationsQuery.isLoading;
  const hasError = policiesQuery.error || simulationsQuery.error;

  const policies = policiesQuery.data?.data ?? FALLBACK_POLICIES;
  const totalSimulations = simulationsQuery.data?.total ?? 8;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([policiesQuery.refetch(), simulationsQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [policiesQuery, simulationsQuery]);

  if (isLoading) {
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

  if (hasError) {
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
