'use client';

import { useState, useCallback, useEffect } from 'react';

interface CopilotEntry {
  id: string;
  query_text: string;
  response_summary: string;
  confidence: number;
  status: string;
  created_at: string;
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.85) return 'text-green-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'pending': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'approved': return 'text-green-600 bg-green-50';
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    case 'rejected': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function CopilotPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [entries, setEntries] = useState<CopilotEntry[]>([]);
  const [totalConversations, setTotalConversations] = useState(0);
  const [totalApprovals, setTotalApprovals] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gedkin/copilot');
      if (!res.ok) throw new Error('Failed to load copilot');
      const json = await res.json();
      setEntries(json.data ?? []);
      setTotalConversations(json.conversations ?? 0);
      setTotalApprovals(json.approvals ?? 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, [fetchData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-lg" />
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
          <p className="text-red-600 font-semibold mb-2">Failed to load copilot</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching copilot data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">No copilot data</p>
          <p className="text-sm text-gray-500 mb-4">No copilot queries are available</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Refresh</button>
        </div>
      </div>
    );
  }

  const avgConfidence = entries.length > 0
    ? (entries.reduce((sum, e) => sum + e.confidence, 0) / entries.length * 100).toFixed(0)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Education Copilot</h1>
          <p className="text-sm text-gray-500">AI-powered decision support</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{entries.length}</p>
          <p className="text-xs text-gray-500">Queries</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalConversations}</p>
          <p className="text-xs text-gray-500">Conversations</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{totalApprovals}</p>
          <p className="text-xs text-gray-500">Approvals</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Queries</h2>
          <p className="text-xs text-gray-500">Avg confidence: {avgConfidence}%</p>
        </div>
        <div className="divide-y divide-gray-50">
          {entries.map((entry) => (
            <div key={entry.id} className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${getStatusDot(entry.status)}`} />
                <span className="text-sm font-bold text-gray-900">{entry.query_text}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2 ml-4">{entry.response_summary}</p>
              <div className="ml-4 flex items-center gap-2 text-xs text-gray-500">
                <span className={`font-semibold ${getConfidenceColor(entry.confidence)}`}>
                  {(entry.confidence * 100).toFixed(0)}% confidence
                </span>
                <span>&middot;</span>
                <span>{new Date(entry.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Pending Approvals</h2>
        </div>
        <div className="p-3 text-center">
          <p className="text-sm text-gray-500">{totalApprovals} recommendations awaiting approval</p>
        </div>
      </div>
    </div>
  );
}
