'use client';

import { useState, useCallback } from 'react';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused' | 'error';
  steps: number;
  last_run: string;
  success_rate: number;
}

const FALLBACK_WORKFLOWS: Workflow[] = [
  { id: '1', name: 'Student Onboarding Pipeline', trigger: 'ENROLLMENT', status: 'active', steps: 6, last_run: '2026-08-10T08:00:00Z', success_rate: 0.98 },
  { id: '2', name: 'Fee Collection Reminder', trigger: 'SCHEDULE', status: 'active', steps: 3, last_run: '2026-08-10T07:00:00Z', success_rate: 0.95 },
  { id: '3', name: 'Exam Results Processing', trigger: 'EVENT', status: 'active', steps: 8, last_run: '2026-08-09T16:00:00Z', success_rate: 0.92 },
  { id: '4', name: 'Teacher Performance Review', trigger: 'SCHEDULE', status: 'paused', steps: 5, last_run: '2026-08-01T10:00:00Z', success_rate: 0.88 },
  { id: '5', name: 'Incident Auto-escalation', trigger: 'CONDITION', status: 'error', steps: 4, last_run: '2026-08-10T06:30:00Z', success_rate: 0.75 },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'paused': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'paused': return 'text-yellow-600 bg-yellow-50';
    case 'error': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTriggerColor(trigger: string): string {
  switch (trigger) {
    case 'ENROLLMENT': return 'text-blue-600 bg-blue-50';
    case 'SCHEDULE': return 'text-purple-600 bg-purple-50';
    case 'EVENT': return 'text-green-600 bg-green-50';
    case 'CONDITION': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getSuccessColor(rate: number): string {
  if (rate >= 0.95) return 'text-green-600';
  if (rate >= 0.85) return 'text-yellow-600';
  return 'text-red-600';
}

export default function WorkflowEnginePage() {
  const [refreshing, setRefreshing] = useState(false);

  const workflows = FALLBACK_WORKFLOWS;
  const activeCount = workflows.filter((w) => w.status === 'active').length;
  const avgSuccess = workflows.length > 0
    ? (workflows.reduce((sum, w) => sum + w.success_rate, 0) / workflows.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Workflow Engine</h1>
          <p className="text-sm text-gray-500">{activeCount} active workflows</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{workflows.length}</p>
          <p className="text-xs text-gray-500">Workflows</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgSuccess}%</p>
          <p className="text-xs text-gray-500">Success</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Workflows</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {workflows.map((wf) => (
            <div key={wf.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(wf.status)}`} />
                  <span className="text-sm font-bold text-gray-900">{wf.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTriggerColor(wf.trigger)}`}>
                  {wf.trigger}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(wf.status)}`}>
                  {wf.status}
                </span>
                <span>{wf.steps} steps</span>
                <span className={`font-semibold ${getSuccessColor(wf.success_rate)}`}>
                  {(wf.success_rate * 100).toFixed(0)}% success
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
