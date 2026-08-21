'use client';

import { useState, useCallback } from 'react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error';
  tasks_completed: number;
  uptime: string;
}

const FALLBACK_AGENTS: Agent[] = [
  { id: '1', name: 'Data Ingestion Agent', type: 'ETL', status: 'active', tasks_completed: 1247, uptime: '99.9%' },
  { id: '2', name: 'Anomaly Detection Agent', type: 'MONITORING', status: 'active', tasks_completed: 89, uptime: '99.7%' },
  { id: '3', name: 'Report Generation Agent', type: 'REPORTING', status: 'idle', tasks_completed: 456, uptime: '98.5%' },
  { id: '4', name: 'Notification Dispatcher', type: 'COMMUNICATION', status: 'active', tasks_completed: 3421, uptime: '99.8%' },
  { id: '5', name: 'Model Retraining Agent', type: 'ML', status: 'error', tasks_completed: 23, uptime: '95.2%' },
  { id: '6', name: 'Cache Optimization Agent', type: 'PERFORMANCE', status: 'active', tasks_completed: 567, uptime: '99.6%' },
];

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
  const [refreshing, setRefreshing] = useState(false);

  const agents = FALLBACK_AGENTS;
  const activeCount = agents.filter((a) => a.status === 'active').length;
  const totalTasks = agents.reduce((sum, a) => sum + a.tasks_completed, 0);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

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
    </div>
  );
}
