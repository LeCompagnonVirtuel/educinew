'use client';

import { useState, useCallback } from 'react';
import { useWorkloads } from '@/features/gecirap/hooks';

interface WorkloadSummary {
  id: string;
  name: string;
  workload_type: string;
  replicas_desired: number;
  replicas_ready: number;
  status: string;
  image: string;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'running': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    case 'pending': return 'bg-blue-500';
    default: return 'bg-gray-400';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'deployment': return 'text-blue-700 bg-blue-50';
    case 'statefulset': return 'text-purple-700 bg-purple-50';
    case 'daemonset': return 'text-orange-700 bg-orange-50';
    case 'job': return 'text-teal-700 bg-teal-50';
    case 'cronjob': return 'text-pink-700 bg-pink-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function WorkloadsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useWorkloads('current-school');
  const workloads = data?.data ?? [];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const healthyCount = workloads.filter((w) => w.status === 'running').length;
  const totalDesired = workloads.reduce((s, w) => s + w.replicas_desired, 0);
  const totalReady = workloads.reduce((s, w) => s + w.replicas_ready, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
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
          <p className="text-red-600 font-semibold mb-2">Failed to load workloads</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (workloads.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Workloads</h1>
            <p className="text-sm text-gray-500">0 healthy / 0 total</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">No workloads found</p>
          <p className="text-gray-400 text-xs mt-1">Deploy an application to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Workloads</h1>
          <p className="text-sm text-gray-500">{healthyCount} healthy / {workloads.length} total</p>
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
          <p className="text-xl font-bold text-green-600">{healthyCount}</p>
          <p className="text-xs text-gray-500">Healthy</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{totalReady}/{totalDesired}</p>
          <p className="text-xs text-gray-500">Replicas</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{workloads.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      <div className="space-y-3">
        {workloads.map((wl) => (
          <div key={wl.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900">{wl.name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(wl.status)}`} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(wl.workload_type)}`}>
                {wl.workload_type}
              </span>
              <span className={`text-xs font-semibold ${wl.replicas_ready === wl.replicas_desired ? 'text-green-600' : 'text-yellow-600'}`}>
                {wl.replicas_ready}/{wl.replicas_desired} ready
              </span>
            </div>
            <p className="text-xs text-gray-400 truncate">{wl.image}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
