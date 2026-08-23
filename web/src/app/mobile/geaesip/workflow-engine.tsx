'use client';

import { useState, useEffect, useCallback } from 'react';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused' | 'error';
  steps: number;
  last_run: string;
  success_rate: number;
}

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
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/geaesip/workflow-engine');
      if (res.ok) {
        const data = await res.json();
        setWorkflows(Array.isArray(data) ? data : data.workflows ?? []);
      }
    } catch {
      setWorkflows([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const activeCount = workflows.filter((w) => w.status === 'active').length;
  const avgSuccess = workflows.length > 0
    ? (workflows.reduce((sum, w) => sum + w.success_rate, 0) / workflows.length * 100).toFixed(0)
    : '0';

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
          <h1 className="text-xl font-bold text-gray-900">Workflow Engine</h1>
          <p className="text-sm text-gray-500">{activeCount} active workflows</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {workflows.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
