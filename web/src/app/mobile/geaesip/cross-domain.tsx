'use client';

import { useState, useCallback } from 'react';

interface DomainLink {
  id: string;
  source_domain: string;
  target_domain: string;
  strength: number;
  type: string;
  last_updated: string;
}

const FALLBACK_LINKS: DomainLink[] = [
  { id: '1', source_domain: 'Academic', target_domain: 'Financial', strength: 0.87, type: 'CAUSAL', last_updated: '2026-08-10T08:00:00Z' },
  { id: '2', source_domain: 'HR', target_domain: 'Academic', strength: 0.72, type: 'CORRELATION', last_updated: '2026-08-10T07:30:00Z' },
  { id: '3', source_domain: 'Infrastructure', target_domain: 'Operations', strength: 0.91, type: 'DEPENDENCY', last_updated: '2026-08-10T09:00:00Z' },
  { id: '4', source_domain: 'Student', target_domain: 'Health', strength: 0.65, type: 'CORRELATION', last_updated: '2026-08-09T16:00:00Z' },
  { id: '5', source_domain: 'Financial', target_domain: 'Infrastructure', strength: 0.83, type: 'CAUSAL', last_updated: '2026-08-10T06:00:00Z' },
];

function getTypeColor(type: string): string {
  switch (type) {
    case 'CAUSAL': return 'text-red-600 bg-red-50';
    case 'CORRELATION': return 'text-blue-600 bg-blue-50';
    case 'DEPENDENCY': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStrengthColor(strength: number): string {
  if (strength >= 0.8) return 'text-green-600';
  if (strength >= 0.6) return 'text-yellow-600';
  return 'text-red-600';
}

export default function CrossDomainPage() {
  const [refreshing, setRefreshing] = useState(false);

  const links = FALLBACK_LINKS;
  const avgStrength = links.length > 0
    ? (links.reduce((sum, l) => sum + l.strength, 0) / links.length * 100).toFixed(0)
    : '0';
  const domains = [...new Set(links.flatMap((l) => [l.source_domain, l.target_domain]))];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Cross-Domain Intelligence</h1>
          <p className="text-sm text-gray-500">Inter-domain relationship mapping</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{links.length}</p>
          <p className="text-xs text-gray-500">Links</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{domains.length}</p>
          <p className="text-xs text-gray-500">Domains</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgStrength}%</p>
          <p className="text-xs text-gray-500">Avg Strength</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Domain Map</h2>
        </div>
        <div className="p-3 flex flex-wrap gap-2">
          {domains.map((domain) => (
            <span key={domain} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
              {domain}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Relationship Links</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {links.map((link) => (
            <div key={link.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{link.source_domain} &rarr; {link.target_domain}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(link.type)}`}>
                  {link.type}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className={`font-semibold ${getStrengthColor(link.strength)}`}>
                  {(link.strength * 100).toFixed(0)}% strength
                </span>
                <span>&middot;</span>
                <span>Updated: {new Date(link.last_updated).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
