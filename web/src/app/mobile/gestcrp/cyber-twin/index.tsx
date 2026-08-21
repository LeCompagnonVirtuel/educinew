'use client';

import { useState } from 'react';

interface CyberTwin {
  id: string;
  name: string;
  status: 'DRAFT' | 'READY' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  simulation_type: 'ATTACK_SIMULATION' | 'PENETRATION_TEST' | 'RED_TEAM' | 'BLUE_TEAM' | 'PURPLE_TEAM' | 'CHAOS_ENGINEERING';
  scope: string;
  score?: number;
  completed_at?: string;
}

const MOCK_TWINS: CyberTwin[] = [
  { id: '1', name: 'Network Perimeter Test', status: 'COMPLETED', simulation_type: 'PENETRATION_TEST', scope: 'External Network', score: 78, completed_at: '2026-08-01T00:00:00Z' },
  { id: '2', name: 'Phishing Resilience', status: 'RUNNING', simulation_type: 'RED_TEAM', scope: 'All Staff', completed_at: undefined },
  { id: '3', name: 'Data Center DR Simulation', status: 'READY', simulation_type: 'CHAOS_ENGINEERING', scope: 'Infrastructure', completed_at: undefined },
  { id: '4', name: 'API Security Audit', status: 'COMPLETED', simulation_type: 'ATTACK_SIMULATION', scope: 'External APIs', score: 92, completed_at: '2026-07-20T00:00:00Z' },
  { id: '5', name: 'Insider Threat Scenario', status: 'DRAFT', simulation_type: 'RED_TEAM', scope: 'Internal Systems', completed_at: undefined },
];

const STATS = {
  totalTwins: 15,
  completedTwins: 9,
  averageScore: 83,
  activeScenarios: 4,
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'COMPLETED': return 'text-green-700 bg-green-50';
    case 'RUNNING': return 'text-blue-700 bg-blue-50';
    case 'READY': return 'text-purple-700 bg-purple-50';
    case 'DRAFT': return 'text-gray-700 bg-gray-50';
    case 'FAILED': return 'text-red-700 bg-red-50';
    case 'PAUSED': return 'text-yellow-700 bg-yellow-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'COMPLETED': return 'bg-green-500';
    case 'RUNNING': return 'bg-blue-500 animate-pulse';
    case 'READY': return 'bg-purple-500';
    case 'DRAFT': return 'bg-gray-400';
    case 'FAILED': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

function getSimulationTypeLabel(type: string): string {
  return type.replace(/_/g, ' ');
}

export default function CyberTwinPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [twins] = useState<CyberTwin[]>(MOCK_TWINS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Cyber Digital Twin</h1>
          <p className="text-sm text-gray-500">Attack simulations & testing</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Twins</p>
          <p className="text-lg font-bold text-fuchsia-600">{STATS.totalTwins}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-lg font-bold text-green-600">{STATS.completedTwins}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Avg Score</p>
          <p className="text-lg font-bold text-blue-600">{STATS.averageScore}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Scenarios</p>
          <p className="text-lg font-bold text-orange-600">{STATS.activeScenarios}</p>
        </div>
      </div>

      <div className="space-y-3">
        {twins.map((twin) => (
          <div key={twin.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(twin.status)}`} />
                <span className="text-base font-bold text-gray-900">{twin.name}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(twin.status)}`}>{twin.status}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="px-2 py-0.5 bg-fuchsia-50 text-fuchsia-700 rounded">{getSimulationTypeLabel(twin.simulation_type)}</span>
              <span>{twin.scope}</span>
            </div>
            {twin.score !== undefined && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">Security Score</span>
                <span className={`text-sm font-bold ${getScoreColor(twin.score)}`}>{twin.score}/100</span>
              </div>
            )}
            {twin.completed_at && (
              <p className="text-xs text-gray-400 mt-1">Completed: {new Date(twin.completed_at).toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
