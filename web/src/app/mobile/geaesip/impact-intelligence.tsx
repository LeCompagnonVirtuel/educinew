'use client';

import { useState, useCallback } from 'react';

interface ImpactMetric {
  id: string;
  name: string;
  domain: string;
  current_value: number;
  target_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

const FALLBACK_METRICS: ImpactMetric[] = [
  { id: '1', name: 'Student Outcome Improvement', domain: 'Academic', current_value: 14.2, target_value: 20, unit: '%', trend: 'up' },
  { id: '2', name: 'Cost Savings', domain: 'Financial', current_value: 125000, target_value: 200000, unit: 'USD', trend: 'up' },
  { id: '3', name: 'Teacher Efficiency Gain', domain: 'HR', current_value: 18.5, target_value: 25, unit: '%', trend: 'up' },
  { id: '4', name: 'Parent Satisfaction', domain: 'Community', current_value: 82, target_value: 90, unit: '%', trend: 'stable' },
  { id: '5', name: 'Operational Downtime Reduction', domain: 'Operations', current_value: 35, target_value: 50, unit: '%', trend: 'up' },
];

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

function getProgressColor(current: number, target: number): string {
  const ratio = current / target;
  if (ratio >= 0.8) return 'bg-green-500';
  if (ratio >= 0.5) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getDomainColor(domain: string): string {
  switch (domain) {
    case 'Academic': return 'text-blue-600 bg-blue-50';
    case 'Financial': return 'text-green-600 bg-green-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'Community': return 'text-teal-600 bg-teal-50';
    case 'Operations': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ImpactIntelligencePage() {
  const [refreshing, setRefreshing] = useState(false);

  const metrics = FALLBACK_METRICS;
  const avgProgress = metrics.length > 0
    ? (metrics.reduce((sum, m) => sum + (m.current_value / m.target_value), 0) / metrics.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Impact Intelligence</h1>
          <p className="text-sm text-gray-500">Measurable outcomes tracking</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{metrics.length}</p>
          <p className="text-xs text-gray-500">Metrics</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{avgProgress}%</p>
          <p className="text-xs text-gray-500">Avg Progress</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{metrics.filter((m) => m.current_value / m.target_value >= 0.8).length}</p>
          <p className="text-xs text-gray-500">On Track</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Impact Metrics</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {metrics.map((metric) => {
            const progress = Math.min((metric.current_value / metric.target_value) * 100, 100);
            return (
              <div key={metric.id} className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-900">{metric.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDomainColor(metric.domain)}`}>
                    {metric.domain}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${getProgressColor(metric.current_value, metric.target_value)}`} style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-gray-600">{progress.toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Current: {metric.current_value}{metric.unit}</span>
                  <span>&middot;</span>
                  <span>Target: {metric.target_value}{metric.unit}</span>
                  <span className={getTrendColor(metric.trend)}>{getTrendIcon(metric.trend)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
