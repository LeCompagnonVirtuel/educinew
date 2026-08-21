'use client';

import { useState, useCallback } from 'react';

interface FabricNode {
  id: string;
  name: string;
  type: 'api' | 'event' | 'webhook' | 'stream';
  status: 'healthy' | 'degraded' | 'down';
  throughput: number;
  latency_ms: number;
  error_rate: number;
}

const FALLBACK_NODES: FabricNode[] = [
  { id: '1', name: 'Student API Gateway', type: 'api', status: 'healthy', throughput: 1250, latency_ms: 45, error_rate: 0.01 },
  { id: '2', name: 'Payment Event Bus', type: 'event', status: 'healthy', throughput: 890, latency_ms: 12, error_rate: 0.005 },
  { id: '3', name: 'Grade Webhook Receiver', type: 'webhook', status: 'degraded', throughput: 320, latency_ms: 230, error_rate: 0.08 },
  { id: '4', name: 'Attendance Stream Processor', type: 'stream', status: 'healthy', throughput: 2100, latency_ms: 8, error_rate: 0.002 },
  { id: '5', name: 'Notification Event Hub', type: 'event', status: 'healthy', throughput: 560, latency_ms: 15, error_rate: 0.003 },
  { id: '6', name: 'Report Generation API', type: 'api', status: 'healthy', throughput: 180, latency_ms: 340, error_rate: 0.02 },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'healthy': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'down': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy': return 'text-green-600 bg-green-50';
    case 'degraded': return 'text-yellow-600 bg-yellow-50';
    case 'down': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'api': return 'text-blue-600 bg-blue-50';
    case 'event': return 'text-green-600 bg-green-50';
    case 'webhook': return 'text-purple-600 bg-purple-50';
    case 'stream': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getLatencyColor(ms: number): string {
  if (ms <= 50) return 'text-green-600';
  if (ms <= 200) return 'text-yellow-600';
  return 'text-red-600';
}

export default function ApiEventFabricPage() {
  const [refreshing, setRefreshing] = useState(false);

  const nodes = FALLBACK_NODES;
  const totalThroughput = nodes.reduce((sum, n) => sum + n.throughput, 0);
  const avgLatency = nodes.length > 0
    ? Math.round(nodes.reduce((sum, n) => sum + n.latency_ms, 0) / nodes.length)
    : 0;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">API & Event Fabric</h1>
          <p className="text-sm text-gray-500">Integration fabric overview</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{nodes.length}</p>
          <p className="text-xs text-gray-500">Endpoints</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalThroughput.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Throughput/m</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgLatency}ms</p>
          <p className="text-xs text-gray-500">Avg Latency</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Fabric Nodes</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {nodes.map((node) => (
            <div key={node.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(node.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{node.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(node.type)}`}>
                  {node.type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(node.status)}`}>
                  {node.status}
                </span>
                <span>{node.throughput.toLocaleString()}/min</span>
                <span className={`font-semibold ${getLatencyColor(node.latency_ms)}`}>
                  {node.latency_ms}ms
                </span>
                <span>Errors: {(node.error_rate * 100).toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
