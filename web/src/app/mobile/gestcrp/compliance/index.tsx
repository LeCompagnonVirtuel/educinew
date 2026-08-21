'use client';

import { useState } from 'react';

interface ComplianceAssessment {
  id: string;
  standard: string;
  name: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NON_COMPLIANT';
  score: number;
  max_score: number;
  assessment_date: string;
}

const MOCK_ASSESSMENTS: ComplianceAssessment[] = [
  { id: '1', standard: 'ISO 27001', name: 'Information Security Management', status: 'COMPLIANT', score: 92, max_score: 100, assessment_date: '2026-07-15T00:00:00Z' },
  { id: '2', standard: 'RGPD', name: 'Data Protection Regulation', status: 'PARTIALLY_COMPLIANT', score: 78, max_score: 100, assessment_date: '2026-06-20T00:00:00Z' },
  { id: '3', standard: 'PCI DSS', name: 'Payment Card Industry', status: 'COMPLIANT', score: 95, max_score: 100, assessment_date: '2026-08-01T00:00:00Z' },
  { id: '4', standard: 'SOC 2', name: 'Service Organization Control', status: 'IN_PROGRESS', score: 65, max_score: 100, assessment_date: '2026-08-05T00:00:00Z' },
];

const STATS = {
  overallScore: 87,
  activePolicies: 34,
  openRisks: 8,
  completedAssessments: 12,
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'COMPLIANT': return 'text-green-700 bg-green-50';
    case 'PARTIALLY_COMPLIANT': return 'text-yellow-700 bg-yellow-50';
    case 'NON_COMPLIANT': return 'text-red-700 bg-red-50';
    case 'IN_PROGRESS': return 'text-blue-700 bg-blue-50';
    case 'NOT_STARTED': return 'text-gray-700 bg-gray-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
}

export default function CompliancePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [assessments] = useState<ComplianceAssessment[]>(MOCK_ASSESSMENTS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Compliance Overview</h1>
          <p className="text-sm text-gray-500">Regulatory compliance status</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Overall Compliance Score</h2>
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-extrabold ${getScoreColor(STATS.overallScore)}`}>{STATS.overallScore}</span>
          <span className="text-sm text-gray-500 mb-1">/ 100</span>
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${STATS.overallScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Policies</p>
          <p className="text-lg font-bold text-emerald-600">{STATS.activePolicies}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Open Risks</p>
          <p className="text-lg font-bold text-orange-600">{STATS.openRisks}</p>
        </div>
      </div>

      <div className="space-y-3">
        {assessments.map((a) => (
          <div key={a.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900">{a.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(a.status)}`}>
                {a.status.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="px-2 py-0.5 bg-gray-100 rounded font-medium">{a.standard}</span>
              <span>Score: {a.score}/{a.max_score}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${a.score >= 90 ? 'bg-green-500' : a.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${(a.score / a.max_score) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
