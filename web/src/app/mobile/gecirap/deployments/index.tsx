'use client';

import { useState, useCallback } from 'react';
import { useDeployments } from '@/features/gecirap/hooks';

interface DeploymentSummary {
  id: string;
  name: string;
  version: string;
  status: string;
  environment: string;
  deployed_at: string;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'pending': return 'bg-blue-500';
    case 'running': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    case 'cancelled': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'pending': return 'text-blue-600 bg-blue-50';
    case 'running': return 'text-yellow-600 bg-yellow-50';
    case 'failed': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getEnvColor(env: string): string {
  switch (env) {
    case 'production': return 'text-red-700 bg-red-50';
    case 'staging': return 'text-yellow-700 bg-yellow-50';
    case 'development': return 'text-blue-700 bg-blue-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function DeploymentsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useDeployments('current-school');
  const deployments = data?.data ?? [];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const activeCount = deployments.filter((d) => d.status === 'active').length;
  const failedCount = deployments.filter((d) => d.status === 'failed').length;

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load deployments</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (deployments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Deployments</h1>
            <p className="text-sm text-gray-500">0 active / 0 total</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">No deployments found</p>
          <p className="text-gray-400 text-xs mt-1">Deploy an application to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Deployments</h1>
          <p className="text-sm text-gray-500">{activeCount} active / {deployments.length} total</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-red-600">{failedCount}</p>
          <p className="text-xs text-gray-500">Failed</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{deployments.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      <div className="space-y-3">
        {deployments.map((dep) => (
          <div key={dep.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900">{dep.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(dep.status)}`} />
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(dep.status)}`}>
                {dep.status}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEnvColor(dep.environment)}`}>
                {dep.environment}
              </span>
              <span className="text-xs text-gray-500">v{dep.version}</span>
            </div>
            <p className="text-xs text-gray-400">{formatDate(dep.deployed_at)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
