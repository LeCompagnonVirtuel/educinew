'use client';

import { useState } from 'react';

interface ThreatIndicator {
  id: string;
  type: 'IP' | 'DOMAIN' | 'URL' | 'FILE_HASH' | 'EMAIL' | 'CVE';
  value: string;
  confidence: number;
  severity: string;
  category: string;
  source: string;
  last_seen: string;
}

const MOCK_INDICATORS: ThreatIndicator[] = [
  { id: '1', type: 'IP', value: '192.168.1.105', confidence: 87, severity: 'HIGH', category: 'C2 Server', source: 'OSINT Feed', last_seen: '2026-08-08T09:00:00Z' },
  { id: '2', type: 'DOMAIN', value: 'malware-c2.evil.com', confidence: 95, severity: 'CRITICAL', category: 'C2 Domain', source: 'Threat Intel', last_seen: '2026-08-08T08:30:00Z' },
  { id: '3', type: 'FILE_HASH', value: 'a1b2c3d4e5f6...', confidence: 72, severity: 'MEDIUM', category: 'Malware', source: 'VirusTotal', last_seen: '2026-08-07T15:00:00Z' },
  { id: '4', type: 'EMAIL', value: 'phish@fake-school.com', confidence: 68, severity: 'LOW', category: 'Phishing', source: 'User Report', last_seen: '2026-08-07T12:00:00Z' },
  { id: '5', type: 'CVE', value: 'CVE-2026-1234', confidence: 100, severity: 'CRITICAL', category: 'Vulnerability', source: 'NVD', last_seen: '2026-08-06T10:00:00Z' },
];

const STATS = {
  totalIndicators: 234,
  activeFeeds: 8,
  averageConfidence: 81,
  criticalCount: 12,
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

function getTypeIcon(type: string): string {
  switch (type) {
    case 'IP': return '🌐';
    case 'DOMAIN': return '🔗';
    case 'URL': return '🔗';
    case 'FILE_HASH': return '📄';
    case 'EMAIL': return '📧';
    case 'CVE': return '🛡️';
    default: return '❓';
  }
}

export default function ThreatsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [indicators] = useState<ThreatIndicator[]>(MOCK_INDICATORS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Threat Indicators</h1>
          <p className="text-sm text-gray-500">Active threat intelligence</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Indicators</p>
          <p className="text-lg font-bold text-amber-600">{STATS.totalIndicators}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Feeds</p>
          <p className="text-lg font-bold text-green-600">{STATS.activeFeeds}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Avg Confidence</p>
          <p className="text-lg font-bold text-blue-600">{STATS.averageConfidence}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Critical</p>
          <p className="text-lg font-bold text-red-600">{STATS.criticalCount}</p>
        </div>
      </div>

      <div className="space-y-3">
        {indicators.map((ind) => (
          <div key={ind.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getTypeIcon(ind.type)}</span>
                <span className="text-base font-bold text-gray-900 truncate">{ind.value}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(ind.severity)}`}>{ind.severity}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{ind.type}</span>
              <span>Confidence: {ind.confidence}%</span>
              <span>{ind.source}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{ind.category}</span>
              <span className="text-xs text-gray-400">Last seen: {new Date(ind.last_seen).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
