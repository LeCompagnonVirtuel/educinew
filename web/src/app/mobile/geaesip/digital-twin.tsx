'use client';

import { useState, useCallback } from 'react';

interface TwinModel {
  id: string;
  name: string;
  domain: string;
  sync_status: 'synced' | 'syncing' | 'drifted';
  fidelity: number;
  last_update: string;
}

const FALLBACK_TWINS: TwinModel[] = [
  { id: '1', name: 'School Infrastructure Twin', domain: 'Infrastructure', sync_status: 'synced', fidelity: 0.96, last_update: '2026-08-10T09:00:00Z' },
  { id: '2', name: 'Student Flow Twin', domain: 'Academic', sync_status: 'synced', fidelity: 0.91, last_update: '2026-08-10T08:45:00Z' },
  { id: '3', name: 'Financial Model Twin', domain: 'Financial', sync_status: 'drifted', fidelity: 0.78, last_update: '2026-08-09T14:00:00Z' },
  { id: '4', name: 'HR Workforce Twin', domain: 'HR', sync_status: 'syncing', fidelity: 0.85, last_update: '2026-08-10T08:50:00Z' },
  { id: '5', name: 'Transport Network Twin', domain: 'Logistics', sync_status: 'synced', fidelity: 0.89, last_update: '2026-08-10T07:30:00Z' },
];

function getStatusDot(status: string): string {
  switch (status) {
    case 'synced': return 'bg-green-500';
    case 'syncing': return 'bg-blue-500';
    case 'drifted': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'synced': return 'text-green-600 bg-green-50';
    case 'syncing': return 'text-blue-600 bg-blue-50';
    case 'drifted': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getFidelityColor(fidelity: number): string {
  if (fidelity >= 0.9) return 'text-green-600';
  if (fidelity >= 0.8) return 'text-yellow-600';
  return 'text-red-600';
}

function getDomainColor(domain: string): string {
  switch (domain) {
    case 'Infrastructure': return 'text-blue-600 bg-blue-50';
    case 'Academic': return 'text-green-600 bg-green-50';
    case 'Financial': return 'text-yellow-600 bg-yellow-50';
    case 'HR': return 'text-purple-600 bg-purple-50';
    case 'Logistics': return 'text-teal-600 bg-teal-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function DigitalTwinPage() {
  const [refreshing, setRefreshing] = useState(false);

  const twins = FALLBACK_TWINS;
  const syncedCount = twins.filter((t) => t.sync_status === 'synced').length;
  const avgFidelity = twins.length > 0
    ? (twins.reduce((sum, t) => sum + t.fidelity, 0) / twins.length * 100).toFixed(0)
    : '0';

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Digital Twin</h1>
          <p className="text-sm text-gray-500">Real-time system visualization</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{twins.length}</p>
          <p className="text-xs text-gray-500">Twins</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{syncedCount}</p>
          <p className="text-xs text-gray-500">Synced</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{avgFidelity}%</p>
          <p className="text-xs text-gray-500">Fidelity</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Twin Models</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {twins.map((twin) => (
            <div key={twin.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getStatusDot(twin.sync_status)}`} />
                  <span className="text-sm font-bold text-gray-900">{twin.name}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDomainColor(twin.domain)}`}>
                  {twin.domain}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(twin.sync_status)}`}>
                  {twin.sync_status}
                </span>
                <span className={`font-semibold ${getFidelityColor(twin.fidelity)}`}>
                  {(twin.fidelity * 100).toFixed(0)}% fidelity
                </span>
                <span>&middot;</span>
                <span>{new Date(twin.last_update).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
