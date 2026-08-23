'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface ZeroTrustPolicyDetail {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  enforcement_mode: 'STRICT' | 'MODERATE' | 'ADVISORY';
  zones: string[];
  conditions: { type: string; value: string }[];
  actions: { type: string; target: string }[];
}

function getEnforcementColor(mode: string): string {
  switch (mode) {
    case 'STRICT': return 'text-red-700 bg-red-50';
    case 'MODERATE': return 'text-yellow-700 bg-yellow-50';
    case 'ADVISORY': return 'text-blue-700 bg-blue-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getActionColor(action: string): string {
  switch (action) {
    case 'ALLOW': return 'text-green-700 bg-green-50';
    case 'DENY': return 'text-red-700 bg-red-50';
    case 'LOG': return 'text-blue-700 bg-blue-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function ZeroTrustPolicyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [policy, setPolicy] = useState<ZeroTrustPolicyDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/security/zero-trust/policies/${id}`);
        if (!res.ok) throw new Error('Politique introuvable');
        setPolicy(await res.json());
      } catch {
        setPolicy(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Politique introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Policy Detail</p>
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
          <p className="text-xs text-gray-500">Enforcement</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${getEnforcementColor(policy.enforcement_mode)}`}>
            {policy.enforcement_mode}
          </span>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Priority</p>
          <p className="text-lg font-bold text-gray-900">{policy.priority}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Zones</p>
          <p className="text-lg font-bold text-gray-900">{policy.zones?.length || 0}</p>
        </div>
      </div>

      {policy.zones && policy.zones.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Zones</h2>
          <div className="flex flex-wrap gap-2">
            {policy.zones.map((zone) => (
              <span key={zone} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{zone}</span>
            ))}
          </div>
        </div>
      )}

      {policy.conditions && policy.conditions.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Conditions</h2>
          <div className="space-y-2">
            {policy.conditions.map((cond, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{cond.type}</span>
                <span className="text-sm text-gray-500">{cond.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {policy.actions && policy.actions.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Actions</h2>
          <div className="space-y-2">
            {policy.actions.map((action, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getActionColor(action.type)}`}>{action.type}</span>
                <span className="text-sm text-gray-600">{action.target}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
