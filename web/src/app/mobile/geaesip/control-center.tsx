'use client';

import { useState, useEffect, useCallback } from 'react';

interface ControlPanel {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  last_sync: string;
  node_count: number;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'inactive': return 'bg-gray-400';
    case 'maintenance': return 'bg-yellow-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'inactive': return 'text-gray-600 bg-gray-50';
    case 'maintenance': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'PIPELINE': return 'text-blue-600 bg-blue-50';
    case 'REGISTRY': return 'text-purple-600 bg-purple-50';
    case 'STREAM': return 'text-green-600 bg-green-50';
    case 'CACHE': return 'text-yellow-600 bg-yellow-50';
    case 'ALERT': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ControlCenterPage() {
  const [panels, setPanels] = useState<ControlPanel[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/control-center');
      if (res.ok) {
        const data = await res.json();
        setPanels(Array.isArray(data) ? data : data.panels ?? []);
      }
    } catch {
      setPanels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const activeCount = panels.filter((p) => p.status === 'active').length;
  const totalNodes = panels.reduce((sum, p) => sum + p.node_count, 0);

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
          <h1 className="text-xl font-bold text-gray-900">Control Center</h1>
          <p className="text-sm text-gray-500">System orchestration overview</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {panels.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
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
              <p className="text-xl font-bold text-yellow-600">{panels.length - activeCount}</p>
              <p className="text-xs text-gray-500">Issues</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Control Panels</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {panels.map((panel) => (
                <div key={panel.id} className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(panel.status)}`} />
                      <span className="text-sm font-bold text-gray-900">{panel.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(panel.type)}`}>
                      {panel.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(panel.status)}`}>
                      {panel.status}
                    </span>
                    <span>{panel.node_count} nodes</span>
                    <span>&middot;</span>
                    <span>Sync: {new Date(panel.last_sync).toLocaleTimeString()}</span>
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
