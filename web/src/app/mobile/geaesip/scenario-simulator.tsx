'use client';

import { useState, useCallback } from 'react';

interface Scenario {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'running' | 'completed' | 'failed';
  variables: number;
  runs: number;
  created_at: string;
}

const FALLBACK_SCENARIOS: Scenario[] = [
  { id: '1', name: 'Enrollment Surge (+20%)', type: 'GROWTH', status: 'completed', variables: 8, runs: 12, created_at: '2026-08-09T10:00:00Z' },
  { id: '2', name: 'Budget Cut (-15%)', type: 'CONSTRAINT', status: 'running', variables: 6, runs: 5, created_at: '2026-08-10T08:00:00Z' },
  { id: '3', name: 'New Campus Launch', type: 'EXPANSION', status: 'draft', variables: 12, runs: 0, created_at: '2026-08-10T09:00:00Z' },
  { id: '4', name: 'Teacher Strike Impact', type: 'DISRUPTION', status: 'completed', variables: 5, runs: 8, created_at: '2026-08-08T14:00:00Z' },
  { id: '5', name: 'Digital Transformation', type: 'TRANSFORMATION', status: 'completed', variables: 10, runs: 15, created_at: '2026-08-07T09:00:00Z' },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'running': return 'bg-blue-500';
    case 'draft': return 'bg-gray-400';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-50';
    case 'running': return 'text-blue-600 bg-blue-50';
    case 'draft': return 'text-gray-600 bg-gray-50';
    case 'failed': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'GROWTH': return 'text-green-600 bg-green-50';
    case 'CONSTRAINT': return 'text-red-600 bg-red-50';
    case 'EXPANSION': return 'text-blue-600 bg-blue-50';
    case 'DISRUPTION': return 'text-yellow-600 bg-yellow-50';
    case 'TRANSFORMATION': return 'text-purple-600 bg-purple-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function ScenarioSimulatorPage() {
  const [refreshing, setRefreshing] = useState(false);

  const scenarios = FALLBACK_SCENARIOS;
  const runningCount = scenarios.filter((s) => s.status === 'running').length;
  const totalRuns = scenarios.reduce((sum, s) => sum + s.runs, 0);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Scenario Simulator</h1>
          <p className="text-sm text-gray-500">{runningCount} scenarios running</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{scenarios.length}</p>
          <p className="text-xs text-gray-500">Scenarios</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalRuns}</p>
          <p className="text-xs text-gray-500">Total Runs</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{scenarios.reduce((sum, s) => sum + s.variables, 0)}</p>
          <p className="text-xs text-gray-500">Variables</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Scenarios</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(scenario.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{scenario.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(scenario.type)}`}>
                  {scenario.type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(scenario.status)}`}>
                  {scenario.status}
                </span>
                <span>{scenario.variables} variables</span>
                <span>&middot;</span>
                <span>{scenario.runs} runs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
