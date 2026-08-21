'use client';

import { useState, useCallback } from 'react';
import { useObservatoryIndicators, useObservatoryDashboards } from '@/features/gedkin/hooks';

interface Indicator {
  id: string;
  name: string;
  category: string;
  current_value: number;
  previous_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

const FALLBACK_INDICATORS: Indicator[] = [
  { id: '1', name: 'Literacy Rate', category: 'Academic', current_value: 78.5, previous_value: 75.2, unit: '%', trend: 'up', confidence: 0.92 },
  { id: '2', name: 'Student-Teacher Ratio', category: 'Operations', current_value: 28, previous_value: 30, unit: ':1', trend: 'down', confidence: 0.88 },
  { id: '3', name: 'Fee Collection Rate', category: 'Financial', current_value: 92.3, previous_value: 89.1, unit: '%', trend: 'up', confidence: 0.95 },
  { id: '4', name: 'Attendance Rate', category: 'Academic', current_value: 85.7, previous_value: 86.1, unit: '%', trend: 'down', confidence: 0.91 },
  { id: '5', name: 'Graduation Rate', category: 'Academic', current_value: 68.2, previous_value: 65.8, unit: '%', trend: 'up', confidence: 0.87 },
  { id: '6', name: 'Infrastructure Score', category: 'Operations', current_value: 7.2, previous_value: 6.9, unit: '/10', trend: 'up', confidence: 0.83 },
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

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Academic': return 'text-blue-600 bg-blue-50';
    case 'Financial': return 'text-green-600 bg-green-50';
    case 'Operations': return 'text-purple-600 bg-purple-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ObservatoryPage() {
  const [refreshing, setRefreshing] = useState(false);
  const indicatorsQuery = useObservatoryIndicators('current-school');
  const dashboardsQuery = useObservatoryDashboards('current-school');

  const isLoading = indicatorsQuery.isLoading || dashboardsQuery.isLoading;
  const hasError = indicatorsQuery.error || dashboardsQuery.error;

  const indicators = indicatorsQuery.data?.data ?? FALLBACK_INDICATORS;
  const totalDashboards = dashboardsQuery.data?.total ?? 4;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([indicatorsQuery.refetch(), dashboardsQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [indicatorsQuery, dashboardsQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load observatory</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching indicators</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  const avgConfidence = indicators.length > 0
    ? (indicators.reduce((sum, i) => sum + i.confidence, 0) / indicators.length * 100).toFixed(0)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Observatory</h1>
          <p className="text-sm text-gray-500">Global education indicators</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{indicators.length}</p>
          <p className="text-xs text-gray-500">Indicators</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalDashboards}</p>
          <p className="text-xs text-gray-500">Dashboards</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgConfidence}%</p>
          <p className="text-xs text-gray-500">Confidence</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Key Indicators</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {indicators.map((indicator) => {
            const delta = indicator.current_value - indicator.previous_value;
            return (
              <div key={indicator.id} className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-900">{indicator.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(indicator.category)}`}>
                    {indicator.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-gray-900">{indicator.current_value}{indicator.unit}</span>
                  <span className={`text-sm font-semibold ${getTrendColor(indicator.trend)}`}>
                    {getTrendIcon(indicator.trend)} {Math.abs(delta).toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Confidence: {(indicator.confidence * 100).toFixed(0)}%</span>
                  <span>&middot;</span>
                  <span>Previous: {indicator.previous_value}{indicator.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
