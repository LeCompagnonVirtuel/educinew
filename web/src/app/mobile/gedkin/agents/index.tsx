'use client';

import { useState, useCallback, useEffect } from 'react';

interface AIAgent {
  id: string;
  name: string;
  agent_type: string;
  status: string;
  success_rate: number;
  tasks_completed: number;
  last_active: string;
}

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/gedkin/agents');
      if (!res.ok) throw new Error('Failed to load agents');
      const json = await res.json();
      setAgents(json.data ?? []);
      setTotalTasks(json.total ?? 0);
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
          <p className="text-red-600 font-semibold mb-2">Failed to load agents</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching agent data</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-2">No agents found</p>
          <p className="text-sm text-gray-500 mb-4">No AI agent data is available</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Refresh</button>
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
