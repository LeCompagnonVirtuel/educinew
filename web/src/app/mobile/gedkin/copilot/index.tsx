'use client';

import { useState, useCallback } from 'react';
import { useCopilotQuery, useCopilotConversations, useCopilotApprovals } from '@/features/gedkin/hooks';

interface CopilotEntry {
  id: string;
  query_text: string;
  response_summary: string;
  confidence: number;
  status: string;
  created_at: string;
}

const FALLBACK_ENTRIES: CopilotEntry[] = [
  { id: '1', query_text: 'What is the projected enrollment for next quarter?', response_summary: 'Based on historical trends, enrollment is projected to grow 8.2%', confidence: 0.89, status: 'completed', created_at: '2026-08-09T10:00:00Z' },
  { id: '2', query_text: 'Which students are at risk of dropping out?', response_summary: 'Identified 23 students with declining attendance and performance patterns', confidence: 0.82, status: 'completed', created_at: '2026-08-09T09:30:00Z' },
  { id: '3', query_text: 'Optimize fee collection strategy', response_summary: 'Recommended staggered payment plans could improve collection by 15%', confidence: 0.78, status: 'completed', created_at: '2026-08-09T08:45:00Z' },
  { id: '4', query_text: 'Compare teacher performance across departments', response_summary: 'Analysis shows Science department outperforms by 12% on student outcomes', confidence: 0.85, status: 'completed', created_at: '2026-08-08T16:00:00Z' },
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
  const queriesQuery = useCopilotQuery('current-school');
  const conversationsQuery = useCopilotConversations('current-school');
  const approvalsQuery = useCopilotApprovals('current-school');

  const isLoading = queriesQuery.isLoading || conversationsQuery.isLoading || approvalsQuery.isLoading;
  const hasError = queriesQuery.error || conversationsQuery.error || approvalsQuery.error;

  const entries = queriesQuery.data?.data ?? FALLBACK_ENTRIES;
  const totalConversations = conversationsQuery.data?.total ?? 28;
  const totalApprovals = approvalsQuery.data?.total ?? 7;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([queriesQuery.refetch(), conversationsQuery.refetch(), approvalsQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [queriesQuery, conversationsQuery, approvalsQuery]);

  if (isLoading) {
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

  if (hasError) {
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
