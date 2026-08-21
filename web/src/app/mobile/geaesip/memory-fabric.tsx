'use client';

import { useState, useCallback } from 'react';

interface MemoryNode {
  id: string;
  name: string;
  domain: string;
  type: 'entity' | 'relation' | 'embedding' | 'index';
  size_kb: number;
  last_accessed: string;
  access_count: number;
}

const FALLBACK_NODES: MemoryNode[] = [
  { id: '1', name: 'Student Profiles Graph', domain: 'Academic', type: 'embedding', size_kb: 2048, last_accessed: '2026-08-10T09:00:00Z', access_count: 1523 },
  { id: '2', name: 'Financial Transactions Index', domain: 'Financial', type: 'index', size_kb: 4096, last_accessed: '2026-08-10T08:45:00Z', access_count: 892 },
  { id: '3', name: 'Knowledge Relations Map', domain: 'Academic', type: 'relation', size_kb: 1024, last_accessed: '2026-08-10T08:00:00Z', access_count: 456 },
  { id: '4', name: 'Staff Entity Registry', domain: 'HR', type: 'entity', size_kb: 512, last_accessed: '2026-08-09T16:00:00Z', access_count: 234 },
  { id: '5', name: 'Infrastructure Metadata', domain: 'Operations', type: 'embedding', size_kb: 768, last_accessed: '2026-08-09T14:00:00Z', access_count: 178 },
];

function getTypeColor(type: string): string {
  switch (type) {
    case 'entity': return 'text-blue-600 bg-blue-50';
    case 'relation': return 'text-green-600 bg-green-50';
    case 'embedding': return 'text-purple-600 bg-purple-50';
    case 'index': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getDomainColor(domain: string): string {
  switch (domain) {
    case 'Academic': return 'text-blue-600 bg-blue-50';
    case 'Financial': return 'text-green-600 bg-green-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'Operations': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function formatSize(kb: number): string {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

export default function MemoryFabricPage() {
  const [refreshing, setRefreshing] = useState(false);

  const nodes = FALLBACK_NODES;
  const totalSize = nodes.reduce((sum, n) => sum + n.size_kb, 0);
  const totalAccess = nodes.reduce((sum, n) => sum + n.access_count, 0);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Memory Fabric</h1>
          <p className="text-sm text-gray-500">Knowledge storage overview</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{nodes.length}</p>
          <p className="text-xs text-gray-500">Nodes</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{formatSize(totalSize)}</p>
          <p className="text-xs text-gray-500">Total Size</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{totalAccess.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Accesses</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Memory Nodes</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {nodes.map((node) => (
            <div key={node.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{node.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(node.type)}`}>
                  {node.type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDomainColor(node.domain)}`}>
                  {node.domain}
                </span>
                <span>{formatSize(node.size_kb)}</span>
                <span>&middot;</span>
                <span>{node.access_count.toLocaleString()} accesses</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
