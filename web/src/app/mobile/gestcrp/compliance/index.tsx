'use client';

import { useState, useEffect } from 'react';

interface ComplianceAssessment {
  id: string;
  standard: string;
  name: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NON_COMPLIANT';
  score: number;
  max_score: number;
  assessment_date: string;
}

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
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<ComplianceAssessment[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/compliance/assessments');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json = await res.json();
      setAssessments(json.data || []);
    } catch {
      setAssessments([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const completedAssessments = assessments.filter((a) => a.status === 'COMPLIANT' || a.status === 'PARTIALLY_COMPLIANT');
  const overallScore = completedAssessments.length > 0
    ? Math.round(completedAssessments.reduce((s, a) => s + (a.score || 0), 0) / completedAssessments.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

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
          <span className={`text-4xl font-extrabold ${getScoreColor(overallScore)}`}>{overallScore}</span>
          <span className="text-sm text-gray-500 mb-1">/ 100</span>
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Assessments</p>
          <p className="text-lg font-bold text-emerald-600">{assessments.length}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-lg font-bold text-green-600">{completedAssessments.length}</p>
        </div>
      </div>

      {assessments.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucune évaluation de conformité trouvée</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
