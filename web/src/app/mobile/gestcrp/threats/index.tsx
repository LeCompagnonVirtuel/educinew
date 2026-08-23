'use client';

import { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(true);
  const [indicators, setIndicators] = useState<ThreatIndicator[]>([]);
  const [stats, setStats] = useState({ totalIndicators: 0, activeFeeds: 0, averageConfidence: 0, criticalCount: 0 });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/threats/indicators');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json = await res.json();
      const items: ThreatIndicator[] = json.data || [];
      setIndicators(items);
      const confSum = items.reduce((s, i) => s + (i.confidence || 0), 0);
      setStats({
        totalIndicators: json.total || items.length,
        activeFeeds: 0,
        averageConfidence: items.length > 0 ? Math.round(confSum / items.length) : 0,
        criticalCount: items.filter((i) => i.severity === 'CRITICAL').length,
      });
    } catch {
      setIndicators([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

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
          <p className="text-lg font-bold text-amber-600">{stats.totalIndicators}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Feeds</p>
          <p className="text-lg font-bold text-green-600">{stats.activeFeeds}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Avg Confidence</p>
          <p className="text-lg font-bold text-blue-600">{stats.averageConfidence}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Critical</p>
          <p className="text-lg font-bold text-red-600">{stats.criticalCount}</p>
        </div>
      </div>

      {indicators.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucun indicateur de menace trouvé</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
