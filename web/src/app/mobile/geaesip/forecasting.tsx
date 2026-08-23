'use client';

import { useState, useEffect, useCallback } from 'react';

interface Forecast {
  id: string;
  name: string;
  type: string;
  confidence: number;
  target_date: string;
  status: string;
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'ENROLLMENT': return 'text-blue-600 bg-blue-50';
    case 'FINANCIAL': return 'text-green-600 bg-green-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'OPERATIONS': return 'text-yellow-600 bg-yellow-50';
    case 'ACADEMIC': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.85) return 'text-green-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'draft': return 'bg-yellow-500';
    case 'completed': return 'bg-blue-500';
    default: return 'bg-gray-400';
  }
}

export default function ForecastingPage() {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/forecasting');
      if (res.ok) {
        const data = await res.json();
        setForecasts(Array.isArray(data) ? data : data.forecasts ?? []);
      }
    } catch {
      setForecasts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const avgConfidence = forecasts.length > 0
    ? (forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length * 100).toFixed(0)
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
          <h1 className="text-xl font-bold text-gray-900">Forecasting</h1>
          <p className="text-sm text-gray-500">Predictive intelligence</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {forecasts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-blue-600">{forecasts.length}</p>
              <p className="text-xs text-gray-500">Forecasts</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-green-600">{forecasts.filter((f) => f.status === 'active').length}</p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-purple-600">{avgConfidence}%</p>
              <p className="text-xs text-gray-500">Confidence</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Active Forecasts</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {forecasts.map((forecast) => (
                <div key={forecast.id} className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(forecast.status)}`} />
                      <span className="text-sm font-bold text-gray-900">{forecast.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(forecast.type)}`}>
                      {forecast.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className={`font-semibold ${getConfidenceColor(forecast.confidence)}`}>
                      {(forecast.confidence * 100).toFixed(0)}% confidence
                    </span>
                    <span>&middot;</span>
                    <span>Target: {forecast.target_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
