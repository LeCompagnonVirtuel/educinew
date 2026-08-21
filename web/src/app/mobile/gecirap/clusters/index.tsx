'use client';

import { useState, useCallback } from 'react';
import { useClusters } from '@/features/gecirap/hooks';

interface ClusterSummary {
  id: string;
  name: string;
  provider: string;
  region_code: string;
  kubernetes_version: string;
  status: string;
  node_count: number;
}

const FALLBACK_CLUSTERS: ClusterSummary[] = [
  { id: '1', name: 'prod-cluster-1', provider: 'aws', region_code: 'us-east-1', kubernetes_version: '1.28.4', status: 'active', node_count: 6 },
  { id: '2', name: 'staging-cluster', provider: 'gcp', region_code: 'eu-west1', kubernetes_version: '1.28.2', status: 'active', node_count: 3 },
  { id: '3', name: 'dev-cluster', provider: 'aws', region_code: 'us-west-2', kubernetes_version: '1.27.8', status: 'degraded', node_count: 2 },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    case 'creating': return 'bg-blue-500';
    case 'deleting': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'degraded': return 'text-yellow-600 bg-yellow-50';
    case 'critical': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ClustersPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useClusters('current-school');
  const clusters = data?.data ?? FALLBACK_CLUSTERS;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const activeCount = clusters.filter((c) => c.status === 'active').length;
  const totalNodes = clusters.reduce((sum, c) => sum + c.node_count, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
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
          <p className="text-red-600 font-semibold mb-2">Failed to load clusters</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Clusters</h1>
          <p className="text-sm text-gray-500">{activeCount} active / {clusters.length} total</p>
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
          <p className="text-xl font-bold text-blue-600">{totalNodes}</p>
          <p className="text-xs text-gray-500">Nodes</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{clusters.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      <div className="space-y-3">
        {clusters.map((cluster) => (
          <div key={cluster.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900">{cluster.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(cluster.status)}`} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(cluster.status)}`}>
                {cluster.status}
              </span>
              <span className="text-xs text-gray-500">K8s {cluster.kubernetes_version}</span>
              <span className="text-xs text-gray-400">{cluster.provider}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">Region: {cluster.region_code}</span>
              <span className="text-xs text-gray-400">&middot;</span>
              <span className="text-xs text-gray-500">{cluster.node_count} nodes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
