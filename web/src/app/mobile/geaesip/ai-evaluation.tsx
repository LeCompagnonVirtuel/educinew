'use client';

import { useState, useCallback } from 'react';

interface EvalResult {
  id: string;
  model_name: string;
  metric: string;
  score: number;
  benchmark: number;
  status: 'pass' | 'fail' | 'warn';
  evaluated_at: string;
}

const FALLBACK_RESULTS: EvalResult[] = [
  { id: '1', model_name: 'Enrollment Predictor', metric: 'Accuracy', score: 0.92, benchmark: 0.85, status: 'pass', evaluated_at: '2026-08-10T08:00:00Z' },
  { id: '2', model_name: 'Risk Classifier', metric: 'F1 Score', score: 0.78, benchmark: 0.80, status: 'fail', evaluated_at: '2026-08-10T07:30:00Z' },
  { id: '3', model_name: 'Fee Default Detector', metric: 'Precision', score: 0.88, benchmark: 0.82, status: 'pass', evaluated_at: '2026-08-10T07:00:00Z' },
  { id: '4', model_name: 'Attendance Forecaster', metric: 'RMSE', score: 0.15, benchmark: 0.20, status: 'pass', evaluated_at: '2026-08-09T16:00:00Z' },
  { id: '5', model_name: 'Performance Grader', metric: 'AUC-ROC', score: 0.81, benchmark: 0.85, status: 'warn', evaluated_at: '2026-08-09T14:00:00Z' },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'pass': return 'bg-green-500';
    case 'warn': return 'bg-yellow-500';
    case 'fail': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'pass': return 'text-green-600 bg-green-50';
    case 'warn': return 'text-yellow-600 bg-yellow-50';
    case 'fail': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getScoreColor(score: number, benchmark: number): string {
  if (score >= benchmark) return 'text-green-600';
  if (score >= benchmark * 0.9) return 'text-yellow-600';
  return 'text-red-600';
}

export default function AIEvaluationPage() {
  const [refreshing, setRefreshing] = useState(false);

  const results = FALLBACK_RESULTS;
  const passCount = results.filter((r) => r.status === 'pass').length;
  const avgScore = results.length > 0
    ? (results.reduce((sum, r) => sum + r.score, 0) / results.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">AI Evaluation</h1>
          <p className="text-sm text-gray-500">Model performance monitoring</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{results.length}</p>
          <p className="text-xs text-gray-500">Models</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{passCount}</p>
          <p className="text-xs text-gray-500">Passing</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgScore}%</p>
          <p className="text-xs text-gray-500">Avg Score</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Evaluation Results</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {results.map((result) => (
            <div key={result.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(result.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{result.model_name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(result.status)}`}>
                  {result.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>Metric: {result.metric}</span>
                <span className={`font-bold ${getScoreColor(result.score, result.benchmark)}`}>
                  Score: {(result.score * 100).toFixed(0)}%
                </span>
                <span>Benchmark: {(result.benchmark * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
