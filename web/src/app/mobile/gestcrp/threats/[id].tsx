'use client';

import { useState } from 'react';

interface ThreatIndicatorDetail {
  id: string;
  type: 'IP' | 'DOMAIN' | 'URL' | 'FILE_HASH' | 'EMAIL' | 'CVE';
  value: string;
  confidence: number;
  severity: string;
  category: string;
  source: string;
  description: string;
  tags: string[];
  mitre_attack_ids: string[];
  associated_threats: string[];
  first_seen: string;
  last_seen: string;
  expiry?: string;
}

const MOCK_DETAIL: ThreatIndicatorDetail = {
  id: '1',
  type: 'DOMAIN',
  value: 'malware-c2.evil.com',
  confidence: 95,
  severity: 'CRITICAL',
  category: 'C2 Domain',
  source: 'Threat Intel Platform',
  description: 'Known command-and-control domain associated with APT28 campaign targeting educational institutions in West Africa.',
  tags: ['apt28', 'c2', 'west-africa', 'education'],
  mitre_attack_ids: ['T1071.001', 'T1573.002'],
  associated_threats: ['APT28 Campaign', 'Data Exfiltration'],
  first_seen: '2026-07-15T00:00:00Z',
  last_seen: '2026-08-08T08:30:00Z',
};

function getSeverityColor(sev: string): string {
  switch (sev) {
    case 'CRITICAL': return 'text-red-700 bg-red-50';
    case 'HIGH': return 'text-orange-700 bg-orange-50';
    case 'MEDIUM': return 'text-yellow-700 bg-yellow-50';
    case 'LOW': return 'text-green-700 bg-green-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function ThreatIndicatorDetailPage() {
  const [indicator] = useState<ThreatIndicatorDetail>(MOCK_DETAIL);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Threat Indicator Detail</p>
        <h1 className="text-xl font-bold text-gray-900 break-all">{indicator.value}</h1>
        <p className="text-sm text-gray-600 mt-1">{indicator.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Type</p>
          <p className="text-lg font-bold text-gray-900">{indicator.type}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Severity</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${getSeverityColor(indicator.severity)}`}>
            {indicator.severity}
          </span>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Confidence</p>
          <p className="text-lg font-bold text-blue-600">{indicator.confidence}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Source</p>
          <p className="text-sm font-bold text-gray-900">{indicator.source}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {indicator.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">{tag}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">MITRE ATT&CK</h2>
        <div className="flex flex-wrap gap-2">
          {indicator.mitre_attack_ids.map((id) => (
            <span key={id} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-mono font-medium">{id}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Associated Threats</h2>
        <div className="space-y-2">
          {indicator.associated_threats.map((threat) => (
            <div key={threat} className="p-2 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">{threat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">First Seen</p>
          <p className="text-sm font-medium text-gray-900">{new Date(indicator.first_seen).toLocaleDateString()}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Last Seen</p>
          <p className="text-sm font-medium text-gray-900">{new Date(indicator.last_seen).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
