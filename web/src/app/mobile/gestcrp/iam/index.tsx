'use client';

import { useState } from 'react';

interface IAMPolicy {
  id: string;
  name: string;
  enabled: boolean;
  effect: 'ALLOW' | 'DENY';
  subjects: string[];
  resources: string[];
  priority: number;
}

const MOCK_POLICIES: IAMPolicy[] = [
  { id: '1', name: 'Admin Full Access', enabled: true, effect: 'ALLOW', subjects: ['admin'], resources: ['*'], priority: 1 },
  { id: '2', name: 'Teacher Read-Only', enabled: true, effect: 'ALLOW', subjects: ['teacher'], resources: ['grades', 'attendance'], priority: 2 },
  { id: '3', name: 'Student Restriction', enabled: true, effect: 'DENY', subjects: ['student'], resources: ['admin_panel', 'user_management'], priority: 3 },
  { id: '4', name: 'Parent View Access', enabled: false, effect: 'ALLOW', subjects: ['parent'], resources: ['reports', 'attendance'], priority: 4 },
];

interface IAMStats {
  totalPolicies: number;
  activeSessions: number;
  failedLogins: number;
  mfaEnabled: number;
}

const DEFAULT_STATS: IAMStats = {
  totalPolicies: 24,
  activeSessions: 156,
  failedLogins: 3,
  mfaEnabled: 89,
};

function getEffectColor(effect: string): string {
  return effect === 'ALLOW' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50';
}

export default function IAMPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [policies] = useState<IAMPolicy[]>(MOCK_POLICIES);
  const [stats] = useState<IAMStats>(DEFAULT_STATS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

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
          <p className="text-lg font-bold text-purple-600">{stats.totalPolicies}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Sessions</p>
          <p className="text-lg font-bold text-green-600">{stats.activeSessions}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Failed Logins</p>
          <p className="text-lg font-bold text-red-600">{stats.failedLogins}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">MFA Enabled %</p>
          <p className="text-lg font-bold text-blue-600">{stats.mfaEnabled}%</p>
        </div>
      </div>

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
              {policy.subjects.map((s) => (
                <span key={s} className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-xs">{s}</span>
              ))}
              <span className="text-xs text-gray-400 mx-1">→</span>
              {policy.resources.map((r) => (
                <span key={r} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
