'use client';

import { useState, useCallback, useEffect } from 'react';

interface Simulation {
  id: string;
  name: string;
  type: string;
  status: string;
  scenario_count: number;
  last_run: string;
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'ENROLLMENT': return 'text-blue-600 bg-blue-50';
    case 'FINANCIAL': return 'text-green-600 bg-green-50';
    case 'STAFFING': return 'text-purple-600 bg-purple-50';
    case 'INFRASTRUCTURE': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'running': return 'bg-blue-500';
    case 'draft': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-50';
    case 'running': return 'text-blue-600 bg-blue-50';
    case 'draft': return 'text-gray-600 bg-gray-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function SimulationPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [totalScenarios, setTotalScenarios] = useState(0);
  const [totalRuns, setTotalRuns] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gedkin/simulation');
      if (!res.ok) throw new Error('Failed to load simulations');
      const json = await res.json();
      setSimulations(json.data ?? []);
      setTotalScenarios(json.scenarios ?? 0);
      setTotalRuns(json.runs ?? 0);
      setTotalResults(json.results ?? 0);
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
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
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
          <p className="text-red-600 font-semibold mb-2">Failed to load simulations</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching simulation engine data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (simulations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">No simulations found</p>
          <p className="text-sm text-gray-500 mb-4">No simulation engine data is available</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Refresh</button>
        </div>
      </div>
    );
  }

  const runningCount = simulations.filter((s) => s.status === 'running').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Simulation Engine</h1>
          <p className="text-sm text-gray-500">{runningCount} running simulations</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{totalScenarios}</p>
          <p className="text-xs text-gray-500">Scenarios</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalRuns}</p>
          <p className="text-xs text-gray-500">Total Runs</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{totalResults}</p>
          <p className="text-xs text-gray-500">Results</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Simulations</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {simulations.map((sim) => (
            <div key={sim.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(sim.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{sim.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(sim.type)}`}>
                  {sim.type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(sim.status)}`}>
                  {sim.status}
                </span>
                <span>{sim.scenario_count} scenarios</span>
                <span>&middot;</span>
                <span>Last: {new Date(sim.last_run).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
