'use client';

import { useState } from 'react';

interface DLPPolicy {
  id: string;
  name: string;
  enabled: boolean;
  policy_type: string;
  data_classification: string[];
  severity: string;
  applies_to: string;
}

const MOCK_POLICIES: DLPPolicy[] = [
  { id: '1', name: 'Student PII Protection', enabled: true, policy_type: 'CONTENT', data_classification: ['CONFIDENTIAL', 'RESTRICTED'], severity: 'HIGH', applies_to: 'ALL' },
  { id: '2', name: 'Financial Data Guard', enabled: true, policy_type: 'PATTERN', data_classification: ['CONFIDENTIAL'], severity: 'CRITICAL', applies_to: 'EMAIL' },
  { id: '3', name: 'Grade Data Masking', enabled: true, policy_type: 'CONTEXT', data_classification: ['INTERNAL'], severity: 'MEDIUM', applies_to: 'DOWNLOAD' },
  { id: '4', name: 'Staff Records DLP', enabled: false, policy_type: 'CONTENT', data_classification: ['RESTRICTED'], severity: 'HIGH', applies_to: 'TRANSFER' },
];

const STATS = {
  activeDLPPolicies: 12,
  unreviewedIncidents: 5,
  activeEncryptionKeys: 8,
  blockedTransfers: 23,
};

function getClassificationColor(classification: string): string {
  switch (classification) {
    case 'RESTRICTED': return 'text-red-700 bg-red-50';
    case 'CONFIDENTIAL': return 'text-orange-700 bg-orange-50';
    case 'INTERNAL': return 'text-blue-700 bg-blue-50';
    case 'PUBLIC': return 'text-green-700 bg-green-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function DataSecurityPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [policies] = useState<DLPPolicy[]>(MOCK_POLICIES);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Security & DLP</h1>
          <p className="text-sm text-gray-500">Data protection policies</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active DLP Policies</p>
          <p className="text-lg font-bold text-teal-600">{STATS.activeDLPPolicies}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Unreviewed Incidents</p>
          <p className="text-lg font-bold text-orange-600">{STATS.unreviewedIncidents}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Encryption Keys</p>
          <p className="text-lg font-bold text-green-600">{STATS.activeEncryptionKeys}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Blocked Transfers</p>
          <p className="text-lg font-bold text-red-600">{STATS.blockedTransfers}</p>
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
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">{policy.policy_type}</span>
              <span className="text-xs text-gray-500">Applies to: {policy.applies_to}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {policy.data_classification.map((c) => (
                <span key={c} className={`px-2 py-0.5 rounded text-xs font-semibold ${getClassificationColor(c)}`}>{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
