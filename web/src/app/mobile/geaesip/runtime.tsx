'use client';

import { useState, useEffect, useCallback } from 'react';

interface RuntimeService {
  id: string;
  name: string;
  version: string;
  status: 'running' | 'stopped' | 'error';
  cpu_percent: number;
  memory_mb: number;
  uptime: string;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'running': return 'bg-green-500';
    case 'stopped': return 'bg-gray-400';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'running': return 'text-green-600 bg-green-50';
    case 'stopped': return 'text-gray-600 bg-gray-50';
    case 'error': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getCpuColor(cpu: number): string {
  if (cpu >= 80) return 'text-red-600';
  if (cpu >= 50) return 'text-yellow-600';
  return 'text-green-600';
}

function formatMemory(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb} MB`;
}

export default function RuntimePage() {
  const [services, setServices] = useState<RuntimeService[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/runtime');
      if (res.ok) {
        const data = await res.json();
        setServices(Array.isArray(data) ? data : data.services ?? []);
      }
    } catch {
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const runningCount = services.filter((s) => s.status === 'running').length;
  const totalMemory = services.reduce((sum, s) => sum + s.memory_mb, 0);

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
          <h1 className="text-xl font-bold text-gray-900">Runtime</h1>
          <p className="text-sm text-gray-500">Service runtime management</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-green-600">{runningCount}</p>
              <p className="text-xs text-gray-500">Running</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-blue-600">{formatMemory(totalMemory)}</p>
              <p className="text-xs text-gray-500">Memory</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-red-600">{services.filter((s) => s.status === 'error').length}</p>
              <p className="text-xs text-gray-500">Errors</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Services</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {services.map((service) => (
                <div key={service.id} className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(service.status)}`} />
                      <span className="text-sm font-bold text-gray-900">{service.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">v{service.version}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                    <span className={`font-semibold ${getCpuColor(service.cpu_percent)}`}>
                      CPU: {service.cpu_percent}%
                    </span>
                    <span>RAM: {formatMemory(service.memory_mb)}</span>
                    <span>&middot;</span>
                    <span>Up: {service.uptime}</span>
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
