'use client';

import { useState, useCallback } from 'react';
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

const MOCK_DETAIL: ClusterDetail = {
  id: '1',
  name: 'prod-cluster-1',
  provider: 'aws',
  region_code: 'us-east-1',
  kubernetes_version: '1.28.4',
  status: 'active',
  node_count: 6,
  endpoint_url: 'https://E1234567.gr7.us-east-1.eks.amazonaws.com',
};

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function ClusterDetailPage() {
  const [cluster] = useState<ClusterDetail>(MOCK_DETAIL);
  const { refetch } = useClusters('current-school');

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

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

      {cluster.endpoint_url && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Endpoint</h2>
          <p className="text-sm text-blue-600 break-all">{cluster.endpoint_url}</p>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Node Distribution</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Master</span>
            <span className="text-sm text-gray-500">3</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Worker</span>
            <span className="text-sm text-gray-500">{cluster.node_count - 3}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
      >
        Refresh Data
      </button>
    </div>
  );
}
