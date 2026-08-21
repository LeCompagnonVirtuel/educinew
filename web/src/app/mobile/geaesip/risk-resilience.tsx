'use client';

import { useState, useCallback } from 'react';

interface RiskItem {
  id: string;
  name: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  likelihood: number;
  mitigation: string;
  status: 'open' | 'mitigated' | 'accepted';
}

const FALLBACK_RISKS: RiskItem[] = [
  { id: '1', name: 'Data Breach Risk', category: 'Security', severity: 'critical', likelihood: 0.15, mitigation: 'Encryption + MFA', status: 'mitigated' },
  { id: '2', name: 'Teacher Shortage', category: 'HR', severity: 'high', likelihood: 0.45, mitigation: 'Recruitment pipeline', status: 'open' },
  { id: '3', name: 'Budget Deficit', category: 'Financial', severity: 'high', likelihood: 0.3, mitigation: 'Cost optimization', status: 'open' },
  { id: '4', name: 'Infrastructure Failure', category: 'Operations', severity: 'medium', likelihood: 0.2, mitigation: 'Redundancy systems', status: 'mitigated' },
  { id: '5', name: 'Regulatory Non-compliance', category: 'Legal', severity: 'medium', likelihood: 0.1, mitigation: 'Audit schedule', status: 'accepted' },
];

function getSeverityDot(severity: string): string {
  switch (severity) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'open': return 'text-red-600 bg-red-50';
    case 'mitigated': return 'text-green-600 bg-green-50';
    case 'accepted': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'Security': return 'text-red-600 bg-red-50';
    case 'HR': return 'text-blue-600 bg-blue-50';
    case 'Financial': return 'text-green-600 bg-green-50';
    case 'Operations': return 'text-purple-600 bg-purple-50';
    case 'Legal': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function RiskResiliencePage() {
  const [refreshing, setRefreshing] = useState(false);

  const risks = FALLBACK_RISKS;
  const openCount = risks.filter((r) => r.status === 'open').length;
  const criticalCount = risks.filter((r) => r.severity === 'critical' || r.severity === 'high').length;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Risk & Resilience</h1>
          <p className="text-sm text-gray-500">Risk assessment dashboard</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{risks.length}</p>
          <p className="text-xs text-gray-500">Total Risks</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-red-600">{openCount}</p>
          <p className="text-xs text-gray-500">Open</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-orange-600">{criticalCount}</p>
          <p className="text-xs text-gray-500">High/Critical</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Risk Register</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {risks.map((risk) => (
            <div key={risk.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getSeverityDot(risk.severity)}`} />
                  <span className="text-sm font-bold text-gray-900">{risk.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(risk.severity)}`}>
                  {risk.severity}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(risk.status)}`}>
                  {risk.status}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(risk.category)}`}>
                  {risk.category}
                </span>
                <span>Likelihood: {(risk.likelihood * 100).toFixed(0)}%</span>
              </div>
              <p className="text-xs text-gray-500 ml-4">Mitigation: {risk.mitigation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
