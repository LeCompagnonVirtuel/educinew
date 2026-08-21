'use client';

import { useState, useCallback } from 'react';

interface CoreMetric {
  id: string;
  name: string;
  value: string;
  category: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const FALLBACK_METRICS: CoreMetric[] = [
  { id: '1', name: 'Decision Velocity', value: '94%', category: 'Performance', status: 'healthy', trend: 'up' },
  { id: '2', name: 'Intelligence Coverage', value: '87%', category: 'Coverage', status: 'healthy', trend: 'up' },
  { id: '3', name: 'Data Freshness', value: '2.3h', category: 'Quality', status: 'healthy', trend: 'stable' },
  { id: '4', name: 'Model Accuracy', value: '91%', category: 'AI', status: 'healthy', trend: 'up' },
  { id: '5', name: 'Response Latency', value: '120ms', category: 'Performance', status: 'warning', trend: 'down' },
  { id: '6', name: 'System Uptime', value: '99.9%', category: 'Reliability', status: 'healthy', trend: 'stable' },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'healthy': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getTrendIcon(trend: string): string {
  switch (trend) {
    case 'up': return '\u2191';
    case 'down': return '\u2193';
    default: return '\u2192';
  }
}

function getTrendColor(trend: string): string {
  switch (trend) {
    case 'up': return 'text-green-600';
    case 'down': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Performance': return 'text-blue-600 bg-blue-50';
    case 'Coverage': return 'text-green-600 bg-green-50';
    case 'Quality': return 'text-purple-600 bg-purple-50';
    case 'AI': return 'text-yellow-600 bg-yellow-50';
    case 'Reliability': return 'text-teal-600 bg-teal-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function IntelligenceCorePage() {
  const [refreshing, setRefreshing] = useState(false);

  const metrics = FALLBACK_METRICS;
  const healthyCount = metrics.filter((m) => m.status === 'healthy').length;
  const overallScore = Math.round((healthyCount / metrics.length) * 100);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Intelligence Core</h1>
          <p className="text-sm text-gray-500">Central intelligence orchestration</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Core Health</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${overallScore >= 80 ? 'text-green-600 bg-green-50' : overallScore >= 60 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
            {overallScore >= 80 ? 'OPTIMAL' : overallScore >= 60 ? 'DEGRADED' : 'CRITICAL'}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-extrabold ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{overallScore}</span>
          <span className="text-sm text-gray-500 mb-1">/ 100</span>
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${overallScore >= 80 ? 'bg-green-500' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${overallScore}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.slice(0, 4).map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${getStatusDot(metric.status)}`} />
              <p className="text-xs text-gray-500">{metric.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
              <span className={`text-xs font-semibold ${getTrendColor(metric.trend)}`}>{getTrendIcon(metric.trend)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">All Metrics</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {metrics.map((metric) => (
            <div key={metric.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(metric.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{metric.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(metric.category)}`}>
                  {metric.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-bold text-gray-900">{metric.value}</span>
                <span className={getTrendColor(metric.trend)}>{getTrendIcon(metric.trend)} trend</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
