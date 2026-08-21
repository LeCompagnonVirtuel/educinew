'use client';

import { useState } from 'react';

interface BCPPlan {
  id: string;
  name: string;
  status: 'DRAFT' | 'ACTIVE' | 'TESTING' | 'FAILED' | 'ARCHIVED';
  scope: string;
  last_tested_at?: string;
  next_test_at?: string;
}

const MOCK_PLANS: BCPPlan[] = [
  { id: '1', name: 'Data Center Failover', status: 'ACTIVE', scope: 'Infrastructure', last_tested_at: '2026-07-01T00:00:00Z', next_test_at: '2026-10-01T00:00:00Z' },
  { id: '2', name: 'Student Data Recovery', status: 'ACTIVE', scope: 'Database', last_tested_at: '2026-06-15T00:00:00Z', next_test_at: '2026-09-15T00:00:00Z' },
  { id: '3', name: 'Payment System DR', status: 'TESTING', scope: 'Payments', last_tested_at: '2026-08-05T00:00:00Z', next_test_at: '2026-08-12T00:00:00Z' },
  { id: '4', name: 'Communication Backup', status: 'DRAFT', scope: 'Messaging', last_tested_at: undefined, next_test_at: undefined },
];

const STATS = {
  activePlans: 8,
  totalBackupJobs: 342,
  failedBackupJobs: 3,
  lastDRTestSuccess: true,
};

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
  const [plans] = useState<BCPPlan[]>(MOCK_PLANS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

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
          <p className="text-lg font-bold text-violet-600">{STATS.activePlans}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Backup Jobs</p>
          <p className="text-lg font-bold text-blue-600">{STATS.totalBackupJobs}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Failed Backups</p>
          <p className="text-lg font-bold text-red-600">{STATS.failedBackupJobs}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Last DR Test</p>
          <p className={`text-lg font-bold ${STATS.lastDRTestSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {STATS.lastDRTestSuccess ? 'Pass' : 'Fail'}
          </p>
        </div>
      </div>

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
    </div>
  );
}
