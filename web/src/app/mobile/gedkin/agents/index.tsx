'use client';

import { useState, useCallback } from 'react';
import { useAIAgents, useAgentTasks } from '@/features/gedkin/hooks';

interface AIAgent {
  id: string;
  name: string;
  agent_type: string;
  status: string;
  success_rate: number;
  tasks_completed: number;
  last_active: string;
}

const FALLBACK_AGENTS: AIAgent[] = [
  { id: '1', name: 'Data Quality Monitor', agent_type: 'MONITOR', status: 'active', success_rate: 0.97, tasks_completed: 1240, last_active: '2026-08-09T10:30:00Z' },
  { id: '2', name: 'Enrollment Predictor', agent_type: 'PREDICTOR', status: 'active', success_rate: 0.89, tasks_completed: 356, last_active: '2026-08-09T09:15:00Z' },
  { id: '3', name: 'Fee Collection Optimizer', agent_type: 'OPTIMIZER', status: 'active', success_rate: 0.92, tasks_completed: 890, last_active: '2026-08-09T08:45:00Z' },
  { id: '4', name: 'Attendance Anomaly Detector', agent_type: 'DETECTOR', status: 'idle', success_rate: 0.85, tasks_completed: 567, last_active: '2026-08-08T22:00:00Z' },
  { id: '5', name: 'Report Generator', agent_type: 'GENERATOR', status: 'active', success_rate: 0.94, tasks_completed: 2100, last_active: '2026-08-09T10:00:00Z' },
  { id: '6', name: 'Policy Compliance Checker', agent_type: 'CHECKER', status: 'active', success_rate: 0.91, tasks_completed: 445, last_active: '2026-08-09T07:30:00Z' },
];

function getAgentTypeColor(type: string): string {
  switch (type) {
    case 'MONITOR': return 'text-blue-600 bg-blue-50';
    case 'PREDICTOR': return 'text-purple-600 bg-purple-50';
    case 'OPTIMIZER': return 'text-green-600 bg-green-50';
    case 'DETECTOR': return 'text-red-600 bg-red-50';
    case 'GENERATOR': return 'text-yellow-600 bg-yellow-50';
    case 'CHECKER': return 'text-indigo-600 bg-indigo-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'idle': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getSuccessColor(rate: number): string {
  if (rate >= 0.95) return 'text-green-600';
  if (rate >= 0.85) return 'text-yellow-600';
  return 'text-red-600';
}

export default function AgentsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const agentsQuery = useAIAgents('current-school');
  const tasksQuery = useAgentTasks('current-school');

  const isLoading = agentsQuery.isLoading || tasksQuery.isLoading;
  const hasError = agentsQuery.error || tasksQuery.error;

  const agents = agentsQuery.data?.data ?? FALLBACK_AGENTS;
  const totalTasks = tasksQuery.data?.total ?? 5598;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([agentsQuery.refetch(), tasksQuery.refetch()])
      .finally(() => setRefreshing(false));
  }, [agentsQuery, tasksQuery]);

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
          <p className="text-red-600 font-semibold mb-2">Failed to load agents</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching agent data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  const activeCount = agents.filter((a) => a.status === 'active').length;
  const avgSuccess = agents.length > 0
    ? (agents.reduce((sum, a) => sum + a.success_rate, 0) / agents.length * 100).toFixed(0)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">AI Agent Network</h1>
          <p className="text-sm text-gray-500">{activeCount} active agents</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{agents.length}</p>
          <p className="text-xs text-gray-500">Agents</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalTasks.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Tasks Done</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgSuccess}%</p>
          <p className="text-xs text-gray-500">Avg Success</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Agent Network</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {agents.map((agent) => (
            <div key={agent.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(agent.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{agent.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getAgentTypeColor(agent.agent_type)}`}>
                  {agent.agent_type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`font-semibold ${getSuccessColor(agent.success_rate)}`}>
                  {(agent.success_rate * 100).toFixed(0)}% success
                </span>
                <span>&middot;</span>
                <span>{agent.tasks_completed.toLocaleString()} tasks</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
