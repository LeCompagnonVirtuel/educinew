'use client';

import { useState } from 'react';

interface SOCIncident {
  id: string;
  title: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'NEW' | 'TRIAGED' | 'INVESTIGATING' | 'CONTAINED' | 'RECOVERED' | 'CLOSED';
  risk_score: number;
  category: string;
}

const MOCK_INCIDENTS: SOCIncident[] = [
  { id: '1', title: 'Brute Force Login Attempt', severity: 'HIGH', status: 'INVESTIGATING', risk_score: 78, category: 'Authentication' },
  { id: '2', title: 'Data Exfiltration Alert', severity: 'CRITICAL', status: 'TRIAGED', risk_score: 92, category: 'Data Loss' },
  { id: '3', title: 'Malware Detected', severity: 'MEDIUM', status: 'CONTAINED', risk_score: 55, category: 'Malware' },
  { id: '4', title: 'Phishing Email Campaign', severity: 'LOW', status: 'RECOVERED', risk_score: 32, category: 'Social Engineering' },
];

const STATS = {
  openIncidents: 12,
  criticalIncidents: 2,
  averageResolutionTime: 4.2,
  totalIncidents: 156,
};

function getSeverityColor(sev: string): string {
  switch (sev) {
    case 'CRITICAL': return 'text-red-700 bg-red-50';
    case 'HIGH': return 'text-orange-700 bg-orange-50';
    case 'MEDIUM': return 'text-yellow-700 bg-yellow-50';
    case 'LOW': return 'text-green-700 bg-green-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'NEW': return 'bg-red-500';
    case 'TRIAGED': return 'bg-orange-500';
    case 'INVESTIGATING': return 'bg-yellow-500';
    case 'CONTAINED': return 'bg-blue-500';
    case 'RECOVERED': return 'bg-green-500';
    case 'CLOSED': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
}

export default function SOCPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [incidents] = useState<SOCIncident[]>(MOCK_INCIDENTS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">SOC Dashboard</h1>
          <p className="text-sm text-gray-500">Security Operations Center</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Open Incidents</p>
          <p className="text-lg font-bold text-red-600">{STATS.openIncidents}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Critical</p>
          <p className="text-lg font-bold text-red-700">{STATS.criticalIncidents}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Avg Resolution (h)</p>
          <p className="text-lg font-bold text-blue-600">{STATS.averageResolutionTime}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Incidents</p>
          <p className="text-lg font-bold text-gray-900">{STATS.totalIncidents}</p>
        </div>
      </div>

      <div className="space-y-3">
        {incidents.map((inc) => (
          <div key={inc.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900 truncate flex-1 mr-2">{inc.title}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(inc.status)}`} />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeverityColor(inc.severity)}`}>{inc.severity}</span>
              <span className="text-xs text-gray-500">{inc.status.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">{inc.category}</span>
              <span className="text-xs font-mono text-gray-600">Risk: {inc.risk_score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
