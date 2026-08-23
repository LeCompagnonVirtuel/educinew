'use client';

import { useState, useEffect, useCallback } from 'react';

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

export default function CopilotPage() {
  const [entries, setEntries] = useState<CopilotEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/copilot');
      if (res.ok) {
        const data = await res.json();
        setEntries(Array.isArray(data) ? data : data.entries ?? []);
      }
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const avgConfidence = entries.length > 0
    ? (entries.reduce((sum, e) => sum + e.confidence, 0) / entries.length * 100).toFixed(0)
    : '0';

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
          <h1 className="text-xl font-bold text-gray-900">GEAESIP Copilot</h1>
          <p className="text-sm text-gray-500">AI-powered decision support</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-blue-600">{entries.length}</p>
              <p className="text-xs text-gray-500">Queries</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-green-600">{avgConfidence}%</p>
              <p className="text-xs text-gray-500">Confidence</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
              <p className="text-xl font-bold text-purple-600">{entries.filter((e) => e.status === 'completed').length}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Recent Interactions</h2>
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
        </>
      )}
    </div>
  );
}
