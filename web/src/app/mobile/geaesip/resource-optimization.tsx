'use client';

import { useState, useEffect, useCallback } from 'react';

interface Resource {
  id: string;
  name: string;
  type: string;
  utilization: number;
  capacity: number;
  status: 'optimal' | 'underutilized' | 'overutilized';
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'optimal': return 'bg-green-500';
    case 'underutilized': return 'bg-yellow-500';
    case 'overutilized': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'optimal': return 'text-green-600 bg-green-50';
    case 'underutilized': return 'text-yellow-600 bg-yellow-50';
    case 'overutilized': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getUtilizationColor(utilization: number): string {
  if (utilization >= 90) return 'text-red-600';
  if (utilization >= 70) return 'text-green-600';
  if (utilization >= 40) return 'text-yellow-600';
  return 'text-gray-600';
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'SPACE': return 'text-blue-600 bg-blue-50';
    case 'TECHNOLOGY': return 'text-purple-600 bg-purple-50';
    case 'HUMAN': return 'text-green-600 bg-green-50';
    case 'VEHICLE': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ResourceOptimizationPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/resource-optimization');
      if (res.ok) {
        const data = await res.json();
        setResources(Array.isArray(data) ? data : data.resources ?? []);
      }
    } catch {
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const avgUtilization = resources.length > 0
    ? (resources.reduce((sum, r) => sum + r.utilization, 0) / resources.length).toFixed(0)
    : '0';
  const overutilizedCount = resources.filter((r) => r.status === 'overutilized').length;

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
          <h1 className="text-xl font-bold text-gray-900">Resource Optimization</h1>
          <p className="text-sm text-gray-500">Resource utilization dashboard</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {resources.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-blue-600">{resources.length}</p>
              <p className="text-xs text-gray-500">Resources</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-green-600">{avgUtilization}%</p>
              <p className="text-xs text-gray-500">Avg Usage</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-red-600">{overutilizedCount}</p>
              <p className="text-xs text-gray-500">Over-used</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Resources</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {resources.map((resource) => (
                <div key={resource.id} className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(resource.status)}`} />
                      <span className="text-sm font-bold text-gray-900">{resource.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${resource.utilization >= 90 ? 'bg-red-500' : resource.utilization >= 70 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${resource.utilization}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${getUtilizationColor(resource.utilization)}`}>{resource.utilization}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </span>
                    <span>Capacity: {resource.capacity}</span>
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
