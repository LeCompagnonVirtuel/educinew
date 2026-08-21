'use client';

import { useState, useCallback } from 'react';
import { useScalingPolicies, useScalingEvents } from '@/features/gecirap/hooks';

interface ScalingPolicy {
  id: string;
  name: string;
  resource_type: string;
  policy_type: string;
  min_replicas: number;
  max_replicas: number;
  is_active: boolean;
  cooldown_seconds: number;
}

interface ScalingEvent {
  id: string;
  policy_id: string;
  event_type: string;
  previous_replicas: number;
  desired_replicas: number;
  status: string;
  triggered_at: string;
}

const FALLBACK_POLICIES: ScalingPolicy[] = [
  { id: '1', name: 'api-cpu-scale', resource_type: 'deployment', policy_type: 'cpu', min_replicas: 2, max_replicas: 10, is_active: true, cooldown_seconds: 300 },
  { id: '2', name: 'worker-mem-scale', resource_type: 'statefulset', policy_type: 'memory', min_replicas: 3, max_replicas: 8, is_active: true, cooldown_seconds: 600 },
  { id: '3', name: 'queue-depth-scale', resource_type: 'deployment', policy_type: 'custom', min_replicas: 1, max_replicas: 20, is_active: false, cooldown_seconds: 120 },
];

const FALLBACK_EVENTS: ScalingEvent[] = [
  { id: '1', policy_id: '1', event_type: 'scale_up', previous_replicas: 2, desired_replicas: 4, status: 'completed', triggered_at: '2026-08-09T08:00:00Z' },
  { id: '2', policy_id: '2', event_type: 'scale_down', previous_replicas: 5, desired_replicas: 3, status: 'completed', triggered_at: '2026-08-09T06:30:00Z' },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'completed': return 'bg-green-500';
    case 'running': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getEventTypeColor(type: string): string {
  switch (type) {
    case 'scale_up': return 'text-green-700 bg-green-50';
    case 'scale_down': return 'text-blue-700 bg-blue-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ScalingPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: policyData, isLoading: policiesLoading, error: policiesError, refetch: refetchPolicies } = useScalingPolicies('current-school');
  const { data: eventData, isLoading: eventsLoading, refetch: refetchEvents } = useScalingEvents('current-school');

  const policies = policyData?.data ?? FALLBACK_POLICIES;
  const events = eventData?.data ?? FALLBACK_EVENTS;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchPolicies(), refetchEvents()]).finally(() => setRefreshing(false));
  }, [refetchPolicies, refetchEvents]);

  const activePolicies = policies.filter((p) => p.is_active).length;

  if (policiesLoading || eventsLoading) {
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

  if (policiesError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load scaling data</p>
          <p className="text-sm text-gray-500 mb-4">{policiesError.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Autoscaling</h1>
          <p className="text-sm text-gray-500">{activePolicies} active policies</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activePolicies}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{events.length}</p>
          <p className="text-xs text-gray-500">Events</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{policies.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Policies</h2>
        <div className="space-y-2">
          {policies.map((policy) => (
            <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${policy.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{policy.name}</p>
                  <p className="text-xs text-gray-500">{policy.resource_type} &middot; {policy.policy_type}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{policy.min_replicas}-{policy.max_replicas}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Events</h2>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(event.status)}`} />
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getEventTypeColor(event.event_type)}`}>
                    {event.event_type}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{event.previous_replicas} &rarr; {event.desired_replicas} replicas</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{formatDate(event.triggered_at)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
