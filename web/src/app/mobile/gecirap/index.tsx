'use client';

import { useState, useCallback } from 'react';
import { useGecirapDashboard } from '@/features/gecirap/hooks';

interface DashboardMetric {
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
}

const MODULES = [
  { name: 'Cloud Providers', route: '/gecirap/cloud' },
  { name: 'Regions', route: '/gecirap/regions' },
  { name: 'Clusters', route: '/gecirap/clusters' },
  { name: 'Workloads', route: '/gecirap/workloads' },
  { name: 'Deployments', route: '/gecirap/deployments' },
  { name: 'Autoscaling', route: '/gecirap/scaling' },
  { name: 'Disaster Recovery', route: '/gecirap/disaster-recovery' },
  { name: 'Edge Infrastructure', route: '/gecirap/edge' },
  { name: 'Network', route: '/gecirap/network' },
  { name: 'AIOps', route: '/gecirap/aiops' },
  { name: 'FinOps', route: '/gecirap/finops' },
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

function computeMetrics(data: ReturnType<typeof useGecirapDashboard>['data']): DashboardMetric[] {
  if (!data) return [];
  return [
    { label: 'Cloud Providers', value: String(data.cloudProviders), status: 'healthy' },
    { label: 'Active Clusters', value: String(data.activeClusters), status: 'healthy' },
    { label: 'Total Workloads', value: String(data.totalWorkloads), status: 'healthy' },
    { label: 'Unhealthy Nodes', value: String(data.unhealthyNodes), status: data.unhealthyNodes > 0 ? 'warning' : 'healthy' },
    { label: 'Unresolved Events', value: String(data.unresolvedEvents), status: data.unresolvedEvents > 0 ? 'warning' : 'healthy' },
    { label: 'Open Incidents', value: String(data.openIncidents), status: data.openIncidents > 0 ? 'critical' : 'healthy' },
    { label: 'Unresolved Drifts', value: String(data.unresolvedDrifts), status: data.unresolvedDrifts > 0 ? 'warning' : 'healthy' },
    { label: 'Unhealthy Networks', value: String(data.unhealthyNetworks), status: data.unhealthyNetworks > 0 ? 'warning' : 'healthy' },
    { label: 'Active Policies', value: String(data.activeScalingPolicies), status: 'healthy' },
    { label: 'Exceeded Budgets', value: String(data.exceededBudgets), status: data.exceededBudgets > 0 ? 'critical' : 'healthy' },
    { label: 'Offline Edge Nodes', value: String(data.offlineEdgeNodes), status: data.offlineEdgeNodes > 0 ? 'warning' : 'healthy' },
  ];
}

export default function GecirapDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useGecirapDashboard('current-school');
  const metrics = computeMetrics(data);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load dashboard</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const healthyCount = metrics.filter((m) => m.status === 'healthy').length;
  const overallScore = metrics.length > 0 ? Math.round((healthyCount / metrics.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">GECIRAP</h1>
          <p className="text-sm text-gray-500">Infrastructure Health Overview</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {metrics.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">No infrastructure data available</p>
          <p className="text-gray-400 text-xs mt-1">Connect cloud providers to see metrics</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Infrastructure Health</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${overallScore >= 80 ? 'text-green-600 bg-green-50' : overallScore >= 60 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'}`}>
            {overallScore >= 80 ? 'HEALTHY' : overallScore >= 60 ? 'DEGRADED' : 'CRITICAL'}
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
        </>
      )}
    </div>
  );
}
