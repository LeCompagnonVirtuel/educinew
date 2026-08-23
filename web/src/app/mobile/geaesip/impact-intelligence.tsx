'use client';

import { useState, useEffect, useCallback } from 'react';

interface ImpactMetric {
  id: string;
  name: string;
  domain: string;
  current_value: number;
  target_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
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
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/impact-intelligence');
      if (res.ok) {
        const data = await res.json();
        setMetrics(Array.isArray(data) ? data : data.metrics ?? []);
      }
    } catch {
      setMetrics([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const avgProgress = metrics.length > 0
    ? (metrics.reduce((sum, m) => sum + (m.current_value / m.target_value), 0) / metrics.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    fetchData().finally(() => setRefreshing(false));
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

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

      {metrics.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
