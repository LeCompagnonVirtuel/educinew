'use client';

import { useState, useCallback, useEffect } from 'react';

interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  status: string;
  progress: number;
  confidence: number;
  dataset_size: number;
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'running': return 'text-green-600 bg-green-50';
    case 'completed': return 'text-blue-600 bg-blue-50';
    case 'draft': return 'text-gray-600 bg-gray-50';
    case 'paused': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'running': return 'bg-green-500';
    case 'completed': return 'bg-blue-500';
    case 'draft': return 'bg-gray-400';
    case 'paused': return 'bg-yellow-500';
    default: return 'bg-gray-400';
  }
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.85) return 'text-green-600';
  if (confidence >= 0.7) return 'text-yellow-600';
  return 'text-red-600';
}

export default function ExperimentsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [totalDatasets, setTotalDatasets] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gedkin/experiments');
      if (!res.ok) throw new Error('Failed to load experiments');
      const json = await res.json();
      setExperiments(json.data ?? []);
      setTotalDatasets(json.datasets ?? 0);
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
          <p className="text-red-600 font-semibold mb-2">Failed to load experiments</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching research lab data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (experiments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">No experiments found</p>
          <p className="text-sm text-gray-500 mb-4">No research experiments are available</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Refresh</button>
        </div>
      </div>
    );
  }

  const runningCount = experiments.filter((e) => e.status === 'running').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Research Lab</h1>
          <p className="text-sm text-gray-500">{runningCount} running experiments</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{experiments.length}</p>
          <p className="text-xs text-gray-500">Experiments</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalDatasets}</p>
          <p className="text-xs text-gray-500">Datasets</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{runningCount}</p>
          <p className="text-xs text-gray-500">Running</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Experiments</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {experiments.map((experiment) => (
            <div key={experiment.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(experiment.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{experiment.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(experiment.status)}`}>
                  {experiment.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2 ml-4 italic">&ldquo;{experiment.hypothesis}&rdquo;</p>
              {experiment.status === 'running' && (
                <div className="ml-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${experiment.progress * 100}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{(experiment.progress * 100).toFixed(0)}%</span>
                  </div>
                </div>
              )}
              <div className="ml-4 flex items-center gap-2 text-xs text-gray-500">
                {experiment.confidence > 0 && (
                  <span className={`font-semibold ${getConfidenceColor(experiment.confidence)}`}>
                    {(experiment.confidence * 100).toFixed(0)}% confidence
                  </span>
                )}
                {experiment.dataset_size > 0 && (
                  <>
                    <span>&middot;</span>
                    <span>{experiment.dataset_size.toLocaleString()} records</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
