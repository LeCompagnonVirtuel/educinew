'use client';

import { useState, useCallback } from 'react';
import { useSimulations, useScenarios, useScenarioRuns, useSimulationResults } from '@/features/gedkin/hooks';

interface Simulation {
  id: string;
  name: string;
  type: string;
  status: string;
  scenario_count: number;
  last_run: string;
}

const FALLBACK_SIMULATIONS: Simulation[] = [
  { id: '1', name: 'Enrollment Growth Scenario', type: 'ENROLLMENT', status: 'completed', scenario_count: 4, last_run: '2026-08-08T14:00:00Z' },
  { id: '2', name: 'Budget Impact Analysis', type: 'FINANCIAL', status: 'running', scenario_count: 6, last_run: '2026-08-09T08:30:00Z' },
  { id: '3', name: 'Staff Capacity Planning', type: 'STAFFING', status: 'completed', scenario_count: 3, last_run: '2026-08-07T16:00:00Z' },
  { id: '4', name: 'Infrastructure Stress Test', type: 'INFRASTRUCTURE', status: 'completed', scenario_count: 5, last_run: '2026-08-06T10:00:00Z' },
];

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
  const simulationsQuery = useSimulations('current-school');
  const scenariosQuery = useScenarios('current-school');
  const runsQuery = useScenarioRuns('current-school');
  const resultsQuery = useSimulationResults('current-school');

  const isLoading = simulationsQuery.isLoading || scenariosQuery.isLoading || runsQuery.isLoading || resultsQuery.isLoading;
  const hasError = simulationsQuery.error || scenariosQuery.error || runsQuery.error || resultsQuery.error;

  const simulations = simulationsQuery.data?.data ?? FALLBACK_SIMULATIONS;
  const totalScenarios = scenariosQuery.data?.total ?? 18;
  const totalRuns = runsQuery.data?.total ?? 42;
  const totalResults = resultsQuery.data?.total ?? 35;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([simulationsQuery.refetch(), scenariosQuery.refetch(), runsQuery.refetch(), resultsQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [simulationsQuery, scenariosQuery, runsQuery, resultsQuery]);

  if (isLoading) {
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

  if (hasError) {
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
