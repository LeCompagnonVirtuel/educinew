'use client';

import { useState, useCallback } from 'react';
import { useEdgeNodes, useEdgeDeployments, useEdgeSyncJobs } from '@/features/gecirap/hooks';

interface EdgeNodeSummary { id: string; name: string; location: string; node_type: string; status: string; }
interface EdgeDeploymentSummary { id: string; name: string; version: string; status: string; }
interface EdgeSyncSummary { id: string; job_name: string; sync_type: string; status: string; items_synced: number; items_failed: number; }

const FALLBACK_NODES: EdgeNodeSummary[] = [
  { id: '1', name: 'edge-dakar-01', location: 'Dakar, Senegal', node_type: 'compute', status: 'online', last_heartbeat_at: new Date().toISOString() },
  { id: '2', name: 'edge-nairobi-01', location: 'Nairobi, Kenya', node_type: 'storage', status: 'online', last_heartbeat_at: new Date().toISOString() },
  { id: '3', name: 'edge-abidjan-01', location: 'Abidjan, Ivory Coast', node_type: 'compute', status: 'offline' },
];

const FALLBACK_DEPLOYMENTS: EdgeDeploymentSummary[] = [
  { id: '1', name: 'edge-api', version: '1.3.0', status: 'active' },
  { id: '2', name: 'edge-cache', version: '2.0.1', status: 'active' },
];

const FALLBACK_SYNC: EdgeSyncSummary[] = [
  { id: '1', job_name: 'data-sync-west', sync_type: 'full', status: 'completed', items_synced: 1520, items_failed: 0 },
  { id: '2', job_name: 'data-sync-east', sync_type: 'incremental', status: 'running', items_synced: 340, items_failed: 2 },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'online': case 'active': case 'completed': return 'bg-green-500';
    case 'running': return 'bg-yellow-500';
    case 'offline': case 'failed': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'online': case 'active': case 'completed': return 'text-green-600 bg-green-50';
    case 'running': return 'text-yellow-600 bg-yellow-50';
    case 'offline': case 'failed': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function EdgePage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: nodeData, isLoading: nodesLoading, error: nodesError, refetch: refetchNodes } = useEdgeNodes('current-school');
  const { data: deployData, isLoading: deploysLoading, refetch: refetchDeploys } = useEdgeDeployments('current-school');
  const { data: syncData, isLoading: syncLoading, refetch: refetchSync } = useEdgeSyncJobs('current-school');

  const nodes = nodeData?.data ?? FALLBACK_NODES;
  const deployments = deployData?.data ?? FALLBACK_DEPLOYMENTS;
  const syncJobs = syncData?.data ?? FALLBACK_SYNC;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchNodes(), refetchDeploys(), refetchSync()]).finally(() => setRefreshing(false));
  }, [refetchNodes, refetchDeploys, refetchSync]);

  const onlineNodes = nodes.filter((n) => n.status === 'online').length;
  const totalSynced = syncJobs.reduce((s, j) => s + j.items_synced, 0);
  const totalFailed = syncJobs.reduce((s, j) => s + j.items_failed, 0);

  if (nodesLoading || deploysLoading || syncLoading) {
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

  if (nodesError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load edge data</p>
          <p className="text-sm text-gray-500 mb-4">{nodesError.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edge Infrastructure</h1>
          <p className="text-sm text-gray-500">{onlineNodes} online / {nodes.length} nodes</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{onlineNodes}</p>
          <p className="text-xs text-gray-500">Online Nodes</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{deployments.length}</p>
          <p className="text-xs text-gray-500">Deployments</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{totalSynced}</p>
          <p className="text-xs text-gray-500">Items Synced</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className={`text-xl font-bold ${totalFailed > 0 ? 'text-red-600' : 'text-green-600'}`}>{totalFailed}</p>
          <p className="text-xs text-gray-500">Sync Failed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Edge Nodes</h2>
        <div className="space-y-2">
          {nodes.map((node) => (
            <div key={node.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(node.status)}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{node.name}</p>
                  <p className="text-xs text-gray-500">{node.location}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(node.status)}`}>
                {node.node_type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Deployments</h2>
        <div className="space-y-2">
          {deployments.map((dep) => (
            <div key={dep.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(dep.status)}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{dep.name}</p>
                  <p className="text-xs text-gray-500">v{dep.version}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(dep.status)}`}>
                {dep.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Sync Jobs</h2>
        <div className="space-y-2">
          {syncJobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(job.status)}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{job.job_name}</p>
                  <p className="text-xs text-gray-500">{job.sync_type} &middot; {job.items_synced} synced</p>
                </div>
              </div>
              {job.items_failed > 0 && (
                <span className="text-xs text-red-600 font-semibold">{job.items_failed} failed</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
