'use client';

import { useState, useCallback } from 'react';
import { useDataDomains, useKnowledgeEntities, useObservatoryIndicators, useForecasts, useAIAgents, useCopilotQuery } from '@/features/gedkin/hooks';

interface DashboardMetric {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
}

const FALLBACK_METRICS: DashboardMetric[] = [
  { label: 'Data Domains', value: '5', status: 'healthy' },
  { label: 'Knowledge Entities', value: '234', status: 'healthy' },
  { label: 'Indicators', value: '47', status: 'healthy' },
  { label: 'Active Forecasts', value: '12', status: 'healthy' },
  { label: 'AI Agents', value: '8', status: 'healthy' },
  { label: 'Copilot Queries', value: '156', status: 'healthy' },
  { label: 'Data Products', value: '23', status: 'healthy' },
  { label: 'Graph Relations', value: '512', status: 'healthy' },
  { label: 'Policy Simulations', value: '4', status: 'healthy' },
  { label: 'Active Experiments', value: '6', status: 'healthy' },
  { label: 'Marketplace Items', value: '15', status: 'healthy' },
  { label: 'System Health', value: '99%', status: 'healthy' },
];

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
  const domains = useDataDomains('current-school');
  const entities = useKnowledgeEntities('current-school');
  const indicators = useObservatoryIndicators('current-school');
  const forecasts = useForecasts('current-school');
  const agents = useAIAgents('current-school');
  const copilot = useCopilotQuery('current-school');

  const isLoading = domains.isLoading || entities.isLoading || indicators.isLoading || forecasts.isLoading || agents.isLoading || copilot.isLoading;
  const hasError = domains.error || entities.error || indicators.error || forecasts.error || agents.error || copilot.error;

  const metrics: DashboardMetric[] = [
    { label: 'Data Domains', value: String(domains.data?.total ?? 5), status: 'healthy' },
    { label: 'Knowledge Entities', value: String(entities.data?.total ?? 234), status: 'healthy' },
    { label: 'Indicators', value: String(indicators.data?.total ?? 47), status: 'healthy' },
    { label: 'Active Forecasts', value: String(forecasts.data?.total ?? 12), status: 'healthy' },
    { label: 'AI Agents', value: String(agents.data?.total ?? 8), status: 'healthy' },
    { label: 'Copilot Queries', value: String(copilot.data?.total ?? 156), status: 'healthy' },
  ];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([domains.refetch(), entities.refetch(), indicators.refetch(), forecasts.refetch(), agents.refetch(), copilot.refetch()])
      .finally(() => setRefreshing(false));
  }, [domains, entities, indicators, forecasts, agents, copilot]);

  if (isLoading) {
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

  if (hasError) {
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
