'use client';

import { useState, useCallback } from 'react';

interface CrisisEvent {
  id: string;
  name: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'monitoring';
  response_time: string;
  created_at: string;
}

const FALLBACK_EVENTS: CrisisEvent[] = [
  { id: '1', name: 'Network Outage - Main Campus', type: 'INFRASTRUCTURE', severity: 'critical', status: 'active', response_time: '5min', created_at: '2026-08-10T09:00:00Z' },
  { id: '2', name: 'Data Sync Failure', type: 'DATA', severity: 'high', status: 'monitoring', response_time: '12min', created_at: '2026-08-10T08:30:00Z' },
  { id: '3', name: 'Payment Gateway Timeout', type: 'FINANCIAL', severity: 'medium', status: 'resolved', response_time: '8min', created_at: '2026-08-09T14:00:00Z' },
  { id: '4', name: 'Exam System Overload', type: 'ACADEMIC', severity: 'high', status: 'resolved', response_time: '3min', created_at: '2026-08-08T10:00:00Z' },
];

function getSeverityDot(severity: string): string {
  switch (severity) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-400';
  }
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical': return 'text-red-600 bg-red-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'low': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'text-red-600 bg-red-50';
    case 'resolved': return 'text-green-600 bg-green-50';
    case 'monitoring': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'INFRASTRUCTURE': return 'text-blue-600 bg-blue-50';
    case 'DATA': return 'text-purple-600 bg-purple-50';
    case 'FINANCIAL': return 'text-green-600 bg-green-50';
    case 'ACADEMIC': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function CrisisCommandPage() {
  const [refreshing, setRefreshing] = useState(false);

  const events = FALLBACK_EVENTS;
  const activeCount = events.filter((e) => e.status === 'active').length;
  const criticalCount = events.filter((e) => e.severity === 'critical').length;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Crisis Command</h1>
          <p className="text-sm text-gray-500">{activeCount} active incidents</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-red-600">{activeCount}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-orange-600">{criticalCount}</p>
          <p className="text-xs text-gray-500">Critical</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{events.filter((e) => e.status === 'resolved').length}</p>
          <p className="text-xs text-gray-500">Resolved</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Incident Log</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {events.map((event) => (
            <div key={event.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getSeverityDot(event.severity)}`} />
                  <span className="text-sm font-bold text-gray-900">{event.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(event.type)}`}>
                  {event.type}
                </span>
                <span>Response: {event.response_time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
