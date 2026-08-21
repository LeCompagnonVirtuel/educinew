'use client';

import { useState, useCallback } from 'react';
import { useAIOpsAgents, useInfrastructureEvents, useIncidentCorrelations, useRecommendations } from '@/features/gecirap/hooks';

interface AIOpsAgent { id: string; name: string; agent_type: string; status: string; capabilities: string[]; }
interface InfraEvent { id: string; event_type: string; severity: string; source: string; message: string; resolved_at?: string; }
interface IncidentCorrelation { id: string; incident_name: string; correlation_score: number; root_cause_suspect?: string; status: string; detected_at: string; }
interface Recommendation { id: string; recommendation_type: string; title: string; description: string; priority: string; status: string; }

const FALLBACK_AGENTS: AIOpsAgent[] = [
  { id: '1', name: 'anomaly-detector', agent_type: 'anomaly_detection', status: 'active', capabilities: ['metric-analysis', 'log-parsing'] },
  { id: '2', name: 'incident-correlator', agent_type: 'correlation', status: 'active', capabilities: ['event-correlation', 'root-cause'] },
  { id: '3', name: 'capacity-forecaster', agent_type: 'forecasting', status: 'active', capabilities: ['usage-prediction', 'cost-forecast'] },
];

const FALLBACK_EVENTS: InfraEvent[] = [
  { id: '1', event_type: 'cpu_spike', severity: 'warning', source: 'prod-cluster-1', message: 'CPU usage exceeded 85% on node-3' },
  { id: '2', event_type: 'disk_low', severity: 'critical', source: 'edge-dakar-01', message: 'Disk space below 10%' },
  { id: '3', event_type: 'pod_restart', severity: 'info', source: 'staging-cluster', message: 'Pod auth-service restarted 3 times', resolved_at: new Date().toISOString() },
];

const FALLBACK_CORRELATIONS: IncidentCorrelation[] = [
  { id: '1', incident_name: 'High Latency Incident', correlation_score: 0.92, root_cause_suspect: 'CPU saturation on worker nodes', status: 'open', detected_at: '2026-08-09T07:00:00Z' },
];

const FALLBACK_RECS: Recommendation[] = [
  { id: '1', recommendation_type: 'cost', title: 'Right-size worker nodes', description: 'Reduce instance type from m5.xlarge to m5.large', priority: 'medium', status: 'pending' },
  { id: '2', recommendation_type: 'performance', title: 'Add HPA', description: 'Enable horizontal pod autoscaler for api-gateway', priority: 'high', status: 'pending' },
];

function getSeverityColor(sev: string): string {
  switch (sev) {
    case 'critical': return 'text-red-700 bg-red-50';
    case 'warning': return 'text-yellow-700 bg-yellow-50';
    case 'info': return 'text-blue-700 bg-blue-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getPriorityColor(p: string): string {
  switch (p) {
    case 'high': return 'text-red-700 bg-red-50';
    case 'medium': return 'text-yellow-700 bg-yellow-50';
    case 'low': return 'text-green-700 bg-green-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': case 'open': return 'bg-green-500';
    case 'resolved': case 'closed': return 'bg-gray-400';
    default: return 'bg-yellow-500';
  }
}

export default function AIOpsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: agentData, isLoading: agentsLoading, error: agentsError, refetch: refetchAgents } = useAIOpsAgents('current-school');
  const { data: eventData, isLoading: eventsLoading, refetch: refetchEvents } = useInfrastructureEvents('current-school');
  const { data: corrData, isLoading: corrsLoading, refetch: refetchCorrs } = useIncidentCorrelations('current-school');
  const { data: recData, isLoading: recsLoading, refetch: refetchRecs } = useRecommendations('current-school');

  const agents = agentData?.data ?? FALLBACK_AGENTS;
  const events = eventData?.data ?? FALLBACK_EVENTS;
  const correlations = corrData?.data ?? FALLBACK_CORRELATIONS;
  const recommendations = recData?.data ?? FALLBACK_RECS;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchAgents(), refetchEvents(), refetchCorrs(), refetchRecs()]).finally(() => setRefreshing(false));
  }, [refetchAgents, refetchEvents, refetchCorrs, refetchRecs]);

  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const unresolvedEvents = events.filter((e) => !e.resolved_at).length;
  const openCorrelations = correlations.filter((c) => c.status === 'open').length;
  if (agentsLoading || eventsLoading || corrsLoading || recsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (agentsError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load AIOps data</p>
          <p className="text-sm text-gray-500 mb-4">{agentsError.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">AIOps</h1>
          <p className="text-sm text-gray-500">{activeAgents} agents active</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activeAgents}</p>
          <p className="text-xs text-gray-500">Agents</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-yellow-600">{unresolvedEvents}</p>
          <p className="text-xs text-gray-500">Events</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-red-600">{openCorrelations}</p>
          <p className="text-xs text-gray-500">Incidents</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Agents</h2>
        <div className="space-y-2">
          {agents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(agent.status)}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{agent.name}</p>
                  <p className="text-xs text-gray-500">{agent.agent_type}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                {agent.capabilities.slice(0, 2).map((cap) => (
                  <span key={cap} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px]">{cap}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Events</h2>
        <div className="space-y-2">
          {events.map((event) => (
            <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(event.severity)}`}>{event.severity}</span>
                <span className="text-xs text-gray-500">{event.source}</span>
              </div>
              <p className="text-sm text-gray-700">{event.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Incidents</h2>
        <div className="space-y-2">
          {correlations.map((corr) => (
            <div key={corr.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-700">{corr.incident_name}</p>
                <span className="text-xs text-gray-500">{Math.round(corr.correlation_score * 100)}%</span>
              </div>
      {corr.root_cause_suspect && <p className="text-xs text-gray-500">RC: {corr.root_cause_suspect}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recommendations</h2>
        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(rec.priority)}`}>{rec.priority}</span>
                <span className="text-sm font-medium text-gray-700">{rec.title}</span>
              </div>
              <p className="text-xs text-gray-500">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
