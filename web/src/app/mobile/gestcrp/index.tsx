'use client';

import { useState, useEffect } from 'react';

interface SecurityScore {
  overall: number;
  riskLevel: string;
  openIncidents: number;
  activeThreats: number;
  complianceRate: number;
  deviceComplianceRate: number;
}

interface DashboardData {
  securityScore: number;
  incidents: { total: number; open: number; critical: number };
  zeroTrust: { totalPolicies: number; activePolicies: number };
  compliance: { totalAssessments: number; completed: number; avgScore: number };
  threats: { totalIndicators: number; active: number };
  vulnerabilities: { total: number; open: number };
  devices: { total: number; active: number };
}

const MODULES = [
  { name: 'Zero Trust', route: '/gestcrp/zero-trust' },
  { name: 'IAM', route: '/gestcrp/iam' },
  { name: 'SOC', route: '/gestcrp/soc' },
  { name: 'Threats', route: '/gestcrp/threats' },
  { name: 'App Security', route: '/gestcrp/app-security' },
  { name: 'Data Security', route: '/gestcrp/data-security' },
  { name: 'Devices', route: '/gestcrp/devices' },
  { name: 'Compliance', route: '/gestcrp/compliance' },
  { name: 'BCP', route: '/gestcrp/bcp' },
  { name: 'Cyber Twin', route: '/gestcrp/cyber-twin' },
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

function getStatusDot(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getRiskLevel(score: number): string {
  if (score >= 90) return 'LOW';
  if (score >= 70) return 'MEDIUM';
  if (score >= 50) return 'HIGH';
  return 'CRITICAL';
}

export default function GestcrpDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<SecurityScore | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/dashboard');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json: DashboardData = await res.json();
      setScore({
        overall: json.securityScore || 0,
        riskLevel: getRiskLevel(json.securityScore || 0),
        openIncidents: json.incidents?.open || 0,
        activeThreats: json.threats?.active || 0,
        complianceRate: json.compliance?.avgScore || 0,
        deviceComplianceRate: json.devices?.total ? Math.round((json.devices.active / json.devices.total) * 100) : 0,
      });
    } catch {
      setScore({ overall: 0, riskLevel: 'CRITICAL', openIncidents: 0, activeThreats: 0, complianceRate: 0, deviceComplianceRate: 0 });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Aucune donnée disponible</p>
      </div>
    );
  }

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
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(score.overall)}`} />
                <span className="text-sm text-gray-700">{mod.name}</span>
              </div>
              <span className={`text-sm font-bold ${getScoreColor(score.overall)}`}>{score.overall}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
