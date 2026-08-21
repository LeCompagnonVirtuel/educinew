'use client';

import { useState, useCallback } from 'react';

interface CopilotEntry {
  id: string;
  query_text: string;
  response_summary: string;
  confidence: number;
  status: string;
  created_at: string;
}

const FALLBACK_ENTRIES: CopilotEntry[] = [
  { id: '1', query_text: 'Optimize class scheduling for next semester', response_summary: 'AI suggests staggered timetable reducing conflicts by 34%', confidence: 0.91, status: 'completed', created_at: '2026-08-10T09:00:00Z' },
  { id: '2', query_text: 'Identify at-risk students for intervention', response_summary: 'Flagged 18 students with declining metrics across attendance and grades', confidence: 0.87, status: 'completed', created_at: '2026-08-10T08:30:00Z' },
  { id: '3', query_text: 'Predict fee default probability', response_summary: 'Model estimates 12% default risk for Q3 based on historical patterns', confidence: 0.83, status: 'completed', created_at: '2026-08-10T07:45:00Z' },
  { id: '4', query_text: 'Recommend teacher training priorities', response_summary: 'Analysis shows STEM pedagogy training would yield highest impact', confidence: 0.79, status: 'completed', created_at: '2026-08-09T16:00:00Z' },
];

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
  const [refreshing, setRefreshing] = useState(false);

  const entries = FALLBACK_ENTRIES;
  const avgConfidence = entries.length > 0
    ? (entries.reduce((sum, e) => sum + e.confidence, 0) / entries.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

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
    </div>
  );
}
