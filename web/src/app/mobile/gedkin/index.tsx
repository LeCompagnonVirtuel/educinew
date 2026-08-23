'use client';

import { useState, useCallback, useEffect } from 'react';

interface DashboardMetric {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
}

interface DashboardData {
  domains?: { total: number };
  entities?: { total: number };
  indicators?: { total: number };
  forecasts?: { total: number };
  agents?: { total: number };
  copilot?: { total: number };
  products?: { total: number };
  relations?: { total: number };
  simulations?: { total: number };
  experiments?: { total: number };
  marketplace?: { total: number };
  health?: number;
}

const MODULES = [
  { name: 'Data Fabric', route: '/gedkin/data-fabric' },
  { name: 'Knowledge Graph', route: '/gedkin/knowledge-graph' },
  { name: 'Research Intelligence', route: '/gedkin/research' },
  { name: 'Observatory', route: '/gedkin/observatory' },
  { name: 'Forecasting', route: '/gedkin/forecasting' },
  { name: 'Policy Intelligence', route: '/gedkin/policy' },
  { name: 'AI Agent Network', route: '/gedkin/agents' },
  { name: 'Research Lab', route: '/gedkin/experiments' },
  { name: 'Data Marketplace', route: '/gedkin/marketplace' },
  { name: 'Simulation Engine', route: '/gedkin/simulation' },
  { name: 'Education Copilot', route: '/gedkin/copilot' },
];

function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy': return 'text-green-600 bg-green-50';
    case 'warning': return 'text-yellow-600 bg-yellow-50';
    case 'critical': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'healthy': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function GedkinDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData>({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gedkin/');
      if (!res.ok) throw new Error('Failed to load dashboard');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const metrics: DashboardMetric[] = [
    { label: 'Data Domains', value: String(data.domains?.total ?? 0), status: 'healthy' },
    { label: 'Knowledge Entities', value: String(data.entities?.total ?? 0), status: 'healthy' },
    { label: 'Indicators', value: String(data.indicators?.total ?? 0), status: 'healthy' },
    { label: 'Active Forecasts', value: String(data.forecasts?.total ?? 0), status: 'healthy' },
    { label: 'AI Agents', value: String(data.agents?.total ?? 0), status: 'healthy' },
    { label: 'Copilot Queries', value: String(data.copilot?.total ?? 0), status: 'healthy' },
    { label: 'Data Products', value: String(data.products?.total ?? 0), status: 'healthy' },
    { label: 'Graph Relations', value: String(data.relations?.total ?? 0), status: 'healthy' },
    { label: 'Policy Simulations', value: String(data.simulations?.total ?? 0), status: 'healthy' },
    { label: 'Active Experiments', value: String(data.experiments?.total ?? 0), status: 'healthy' },
    { label: 'Marketplace Items', value: String(data.marketplace?.total ?? 0), status: 'healthy' },
    { label: 'System Health', value: `${data.health ?? 0}%`, status: 'healthy' },
  ];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load dashboard</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching intelligence data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data || metrics.every((m) => m.value === '0')) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">No data available</p>
          <p className="text-sm text-gray-500 mb-4">The dashboard has no intelligence data to display</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const healthyCount = metrics.filter((m) => m.status === 'healthy').length;
  const overallScore = Math.round((healthyCount / metrics.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">GEDKIN</h1>
          <p className="text-sm text-gray-500">Global Education Data & Knowledge Intelligence</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Intelligence Health</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${overallScore >= 80 ? 'text-green-600 bg-green-50' : overallScore >= 60 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
            {overallScore >= 80 ? 'OPTIMAL' : overallScore >= 60 ? 'DEGRADED' : 'CRITICAL'}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-extrabold ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{overallScore}</span>
          <span className="text-sm text-gray-500 mb-1">/ 100</span>
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${overallScore >= 80 ? 'bg-green-500' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500">{metric.label}</p>
            <p className={`text-lg font-bold ${getStatusColor(metric.status).split(' ')[0]}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Modules</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {MODULES.map((mod) => (
            <div key={mod.name} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot('healthy')}`} />
                <span className="text-sm text-gray-700">{mod.name}</span>
              </div>
              <span className="text-xs text-gray-400">&rsaquo;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
