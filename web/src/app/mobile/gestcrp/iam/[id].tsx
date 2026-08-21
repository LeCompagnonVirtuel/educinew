'use client';

import { useState } from 'react';

interface IAMPolicyDetail {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  effect: 'ALLOW' | 'DENY';
  subjects: string[];
  resources: string[];
  actions: string[];
  conditions: { type: string; operator: string; value: string }[];
  priority: number;
}

const MOCK_DETAIL: IAMPolicyDetail = {
  id: '1',
  name: 'Admin Full Access',
  description: 'Grants full administrative access to all school resources and system configurations.',
  enabled: true,
  effect: 'ALLOW',
  subjects: ['SUPER_ADMIN', 'ADMIN'],
  resources: ['*'],
  actions: ['read', 'write', 'delete', 'manage'],
  conditions: [
    { type: 'mfa_verified', operator: 'equals', value: 'true' },
    { type: 'ip_range', operator: 'in', value: '10.0.0.0/8' },
    { type: 'time_window', operator: 'between', value: '00:00-23:59' },
  ],
  priority: 1,
};

function getEffectColor(effect: string): string {
  return effect === 'ALLOW' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50';
}

export default function IAMPolicyDetailPage() {
  const [policy] = useState<IAMPolicyDetail>(MOCK_DETAIL);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">IAM Policy Detail</p>
        <h1 className="text-xl font-bold text-gray-900">{policy.name}</h1>
        <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Status</p>
          <p className={`text-lg font-bold ${policy.enabled ? 'text-green-600' : 'text-gray-400'}`}>
            {policy.enabled ? 'Active' : 'Disabled'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Effect</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${getEffectColor(policy.effect)}`}>
            {policy.effect}
          </span>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Priority</p>
          <p className="text-lg font-bold text-gray-900">{policy.priority}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Resources</p>
          <p className="text-lg font-bold text-gray-900">{policy.resources.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {policy.subjects.map((s) => (
            <span key={s} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">{s}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Actions</h2>
        <div className="flex flex-wrap gap-2">
          {policy.actions.map((a) => (
            <span key={a} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{a}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Conditions</h2>
        <div className="space-y-2">
          {policy.conditions.map((cond, idx) => (
            <div key={idx} className="p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{cond.type}</span>
                <span className="text-xs text-gray-500">{cond.operator}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{cond.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
