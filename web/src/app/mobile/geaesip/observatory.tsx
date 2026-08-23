'use client';

import { useState, useEffect, useCallback } from 'react';

interface ObservatoryIndicator {
  id: string;
  name: string;
  category: string;
  current_value: number;
  previous_value: number;
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

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Academic': return 'text-blue-600 bg-blue-50';
    case 'Financial': return 'text-green-600 bg-green-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'Operations': return 'text-yellow-600 bg-yellow-50';
    case 'Technology': return 'text-teal-600 bg-teal-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ObservatoryPage() {
  const [indicators, setIndicators] = useState<ObservatoryIndicator[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/observatory');
      if (res.ok) {
        const data = await res.json();
        setIndicators(Array.isArray(data) ? data : data.indicators ?? []);
      }
    } catch {
      setIndicators([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const upCount = indicators.filter((i) => i.trend === 'up').length;

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
          <h1 className="text-xl font-bold text-gray-900">Observatory</h1>
          <p className="text-sm text-gray-500">Global education indicators</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {indicators.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-blue-600">{indicators.length}</p>
              <p className="text-xs text-gray-500">Indicators</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-green-600">{upCount}</p>
              <p className="text-xs text-gray-500">Improving</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-purple-600">{indicators.length - upCount}</p>
              <p className="text-xs text-gray-500">Declining</p>
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
                    <p className="text-xs text-gray-500">Previous: {indicator.previous_value}{indicator.unit}</p>
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
