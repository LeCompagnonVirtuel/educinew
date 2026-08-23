'use client';

import { useState, useEffect, useCallback } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error';
  tasks_completed: number;
  uptime: string;
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'idle': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'idle': return 'text-yellow-600 bg-yellow-50';
    case 'error': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'ETL': return 'text-blue-600 bg-blue-50';
    case 'MONITORING': return 'text-red-600 bg-red-50';
    case 'REPORTING': return 'text-purple-600 bg-purple-50';
    case 'COMMUNICATION': return 'text-green-600 bg-green-50';
    case 'ML': return 'text-yellow-600 bg-yellow-50';
    case 'PERFORMANCE': return 'text-teal-600 bg-teal-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function AgentOrchestrationPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/agent-orchestration');
      if (res.ok) {
        const data = await res.json();
        setAgents(Array.isArray(data) ? data : data.agents ?? []);
      }
    } catch {
      setAgents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const activeCount = agents.filter((a) => a.status === 'active').length;
  const totalTasks = agents.reduce((sum, a) => sum + a.tasks_completed, 0);

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
          <h1 className="text-xl font-bold text-gray-900">Agent Orchestration</h1>
          <p className="text-sm text-gray-500">{activeCount} agents active</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {agents.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
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
              <p className="text-xl font-bold text-yellow-600">{agents.filter((a) => a.status === 'error').length}</p>
              <p className="text-xs text-gray-500">Errors</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Agent Fleet</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {agents.map((agent) => (
                <div key={agent.id} className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(agent.status)}`} />
                      <span className="text-sm font-bold text-gray-900">{agent.name}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(agent.type)}`}>
                      {agent.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                    <span>{agent.tasks_completed.toLocaleString()} tasks</span>
                    <span>&middot;</span>
                    <span>Uptime: {agent.uptime}</span>
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
