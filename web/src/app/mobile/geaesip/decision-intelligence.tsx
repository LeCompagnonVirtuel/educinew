'use client';

import { useState, useCallback } from 'react';

interface Decision {
  id: string;
  title: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'executed' | 'rejected';
  created_at: string;
}

const FALLBACK_DECISIONS: Decision[] = [
  { id: '1', title: 'Increase teacher hiring by 15%', category: 'HR', confidence: 0.89, impact: 'high', status: 'approved', created_at: '2026-08-10T08:00:00Z' },
  { id: '2', title: 'Launch digital library platform', category: 'Technology', confidence: 0.82, impact: 'high', status: 'pending', created_at: '2026-08-10T07:30:00Z' },
  { id: '3', title: 'Restructure fee payment plans', category: 'Financial', confidence: 0.91, impact: 'medium', status: 'executed', created_at: '2026-08-09T14:00:00Z' },
  { id: '4', title: 'Implement AI tutoring system', category: 'Academic', confidence: 0.76, impact: 'high', status: 'pending', created_at: '2026-08-09T10:00:00Z' },
  { id: '5', title: 'Optimize transport routes', category: 'Logistics', confidence: 0.85, impact: 'low', status: 'executed', created_at: '2026-08-08T16:00:00Z' },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'approved': return 'bg-green-500';
    case 'executed': return 'bg-blue-500';
    case 'pending': return 'bg-yellow-500';
    case 'rejected': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'approved': return 'text-green-600 bg-green-50';
    case 'executed': return 'text-blue-600 bg-blue-50';
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    case 'rejected': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getImpactColor(impact: string): string {
  switch (impact) {
    case 'high': return 'text-red-600 bg-red-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.85) return 'text-green-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
}

export default function DecisionIntelligencePage() {
  const [refreshing, setRefreshing] = useState(false);

  const decisions = FALLBACK_DECISIONS;
  const pendingCount = decisions.filter((d) => d.status === 'pending').length;
  const avgConfidence = decisions.length > 0
    ? (decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Decision Intelligence</h1>
          <p className="text-sm text-gray-500">AI-powered decision support</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{decisions.length}</p>
          <p className="text-xs text-gray-500">Decisions</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-yellow-600">{pendingCount}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{avgConfidence}%</p>
          <p className="text-xs text-gray-500">Confidence</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Decisions</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {decisions.map((decision) => (
            <div key={decision.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(decision.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{decision.title}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getImpactColor(decision.impact)}`}>
                  {decision.impact}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(decision.status)}`}>
                  {decision.status}
                </span>
                <span className={`font-semibold ${getConfidenceColor(decision.confidence)}`}>
                  {(decision.confidence * 100).toFixed(0)}% confidence
                </span>
                <span>&middot;</span>
                <span>{new Date(decision.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
