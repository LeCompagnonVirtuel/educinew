'use client';

import { useState, useEffect, useCallback } from 'react';

interface EvalResult {
  id: string;
  model_name: string;
  metric: string;
  score: number;
  benchmark: number;
  status: 'pass' | 'fail' | 'warn';
  evaluated_at: string;
}

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
  const [results, setResults] = useState<EvalResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/ai-evaluation');
      if (res.ok) {
        const data = await res.json();
        setResults(Array.isArray(data) ? data : data.results ?? []);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const passCount = results.filter((r) => r.status === 'pass').length;
  const avgScore = results.length > 0
    ? (results.reduce((sum, r) => sum + r.score, 0) / results.length * 100).toFixed(0)
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
          <h1 className="text-xl font-bold text-gray-900">AI Evaluation</h1>
          <p className="text-sm text-gray-500">Model performance monitoring</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {results.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
