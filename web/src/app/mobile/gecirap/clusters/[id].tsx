'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useClusters } from '@/features/gecirap/hooks';

interface ClusterDetail {
  id: string;
  name: string;
  provider: string;
  region_code: string;
  kubernetes_version: string;
  status: string;
  node_count: number;
  endpoint_url?: string;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function ClusterDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useClusters('current-school');
  const cluster = data?.data?.find((c) => c.id === id) as ClusterDetail | undefined;

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
          <p className="text-red-600 font-semibold mb-2">Failed to load cluster</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (!cluster) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">Cluster not found</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Cluster Detail</p>
        <h1 className="text-xl font-bold text-gray-900">{cluster.name}</h1>
        <p className="text-sm text-gray-600 mt-1">Kubernetes {cluster.kubernetes_version}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Status</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(cluster.status)}`} />
            <p className="text-lg font-bold text-gray-900 capitalize">{cluster.status}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Provider</p>
          <p className="text-lg font-bold text-gray-900">{cluster.provider.toUpperCase()}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Region</p>
          <p className="text-lg font-bold text-gray-900">{cluster.region_code}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Nodes</p>
          <p className="text-lg font-bold text-gray-900">{cluster.node_count}</p>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        disabled={refreshing}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
      >
        {refreshing ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </div>
  );
}
