'use client';

import { useState } from 'react';

interface SecurityScore {
  overall: number;
  riskLevel: string;
  openIncidents: number;
  activeThreats: number;
  complianceRate: number;
  deviceComplianceRate: number;
}

const DEFAULT_SCORE: SecurityScore = {
  overall: 87,
  riskLevel: 'LOW',
  openIncidents: 2,
  activeThreats: 12,
  complianceRate: 94.5,
  deviceComplianceRate: 96.2,
};

const MODULES = [
  { name: 'Zero Trust', score: 92, status: 'active' as const, route: '/gestcrp/zero-trust' },
  { name: 'IAM', score: 88, status: 'active' as const, route: '/gestcrp/iam' },
  { name: 'SOC', score: 75, status: 'warning' as const, route: '/gestcrp/soc' },
  { name: 'Threats', score: 81, status: 'active' as const, route: '/gestcrp/threats' },
  { name: 'App Security', score: 70, status: 'warning' as const, route: '/gestcrp/app-security' },
  { name: 'Data Security', score: 95, status: 'active' as const, route: '/gestcrp/data-security' },
  { name: 'Devices', score: 96, status: 'active' as const, route: '/gestcrp/devices' },
  { name: 'Compliance', score: 94, status: 'active' as const, route: '/gestcrp/compliance' },
  { name: 'BCP', score: 88, status: 'active' as const, route: '/gestcrp/bcp' },
  { name: 'Cyber Twin', score: 82, status: 'active' as const, route: '/gestcrp/cyber-twin' },
];

function getRiskColor(level: string): string {
  switch (level) {
    case 'LOW': return 'text-green-600 bg-green-50';
    case 'MEDIUM': return 'text-yellow-600 bg-yellow-50';
    case 'HIGH': return 'text-orange-600 bg-orange-50';
    case 'CRITICAL': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function GestcrpDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [score] = useState<SecurityScore>(DEFAULT_SCORE);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">GESTCRP Security</h1>
          <p className="text-sm text-gray-500">Posture Overview</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Overall Security Score</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getRiskColor(score.riskLevel)}`}>
            {score.riskLevel}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className={`text-4xl font-extrabold ${getScoreColor(score.overall)}`}>{score.overall}</span>
          <span className="text-sm text-gray-500 mb-1">/ 100</span>
        </div>
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${score.overall >= 80 ? 'bg-green-500' : score.overall >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${score.overall}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Open Incidents</p>
          <p className="text-lg font-bold text-red-600">{score.openIncidents}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Active Threats</p>
          <p className="text-lg font-bold text-orange-600">{score.activeThreats}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Compliance Rate</p>
          <p className="text-lg font-bold text-blue-600">{score.complianceRate}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Device Compliance</p>
          <p className="text-lg font-bold text-blue-600">{score.deviceComplianceRate}%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Security Modules</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {MODULES.map((mod) => (
            <div key={mod.name} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(mod.status)}`} />
                <span className="text-sm text-gray-700">{mod.name}</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(mod.score)}`}>{mod.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
