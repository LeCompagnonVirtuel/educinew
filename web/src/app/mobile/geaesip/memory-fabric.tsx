'use client';

import { useState, useEffect, useCallback } from 'react';

interface MemoryNode {
  id: string;
  name: string;
  domain: string;
  type: 'entity' | 'relation' | 'embedding' | 'index';
  size_kb: number;
  last_accessed: string;
  access_count: number;
}

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
  const [nodes, setNodes] = useState<MemoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/memory-fabric');
      if (res.ok) {
        const data = await res.json();
        setNodes(Array.isArray(data) ? data : data.nodes ?? []);
      }
    } catch {
      setNodes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const totalSize = nodes.reduce((sum, n) => sum + n.size_kb, 0);
  const totalAccess = nodes.reduce((sum, n) => sum + n.access_count, 0);

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
          <h1 className="text-xl font-bold text-gray-900">Memory Fabric</h1>
          <p className="text-sm text-gray-500">Knowledge storage overview</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {nodes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
