'use client';

import { useState } from 'react';

interface AppScan {
  id: string;
  scan_type: 'SAST' | 'DAST' | 'SCA' | 'IAST' | 'CONTAINER' | 'API' | 'SECRETS';
  target: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  findings: { severity: string; count: number }[];
  scanner: string;
  completed_at?: string;
}

const MOCK_SCANS: AppScan[] = [
  { id: '1', scan_type: 'SAST', target: 'educloud-api', status: 'COMPLETED', findings: [{ severity: 'HIGH', count: 3 }, { severity: 'MEDIUM', count: 12 }], scanner: 'SonarQube', completed_at: '2026-08-08T06:00:00Z' },
  { id: '2', scan_type: 'DAST', target: 'student-portal', status: 'RUNNING', findings: [], scanner: 'OWASP ZAP', completed_at: undefined },
  { id: '3', scan_type: 'SCA', target: 'teacher-app', status: 'COMPLETED', findings: [{ severity: 'CRITICAL', count: 1 }, { severity: 'LOW', count: 5 }], scanner: 'Snyk', completed_at: '2026-08-07T22:00:00Z' },
  { id: '4', scan_type: 'SECRETS', target: 'all-repos', status: 'FAILED', findings: [], scanner: 'GitLeaks', completed_at: '2026-08-07T18:00:00Z' },
  { id: '5', scan_type: 'CONTAINER', target: 'payment-service', status: 'COMPLETED', findings: [{ severity: 'HIGH', count: 2 }], scanner: 'Trivy', completed_at: '2026-08-07T14:00:00Z' },
];

const STATS = {
  totalVulnerabilities: 47,
  criticalVulnerabilities: 4,
  openVulnerabilities: 18,
  scansThisWeek: 12,
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'COMPLETED': return 'text-green-700 bg-green-50';
    case 'RUNNING': return 'text-blue-700 bg-blue-50';
    case 'PENDING': return 'text-yellow-700 bg-yellow-50';
    case 'FAILED': return 'text-red-700 bg-red-50';
    case 'CANCELLED': return 'text-gray-700 bg-gray-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'COMPLETED': return 'bg-green-500';
    case 'RUNNING': return 'bg-blue-500 animate-pulse';
    case 'PENDING': return 'bg-yellow-500';
    case 'FAILED': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function AppSecurityPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [scans] = useState<AppScan[]>(MOCK_SCANS);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">App Security</h1>
          <p className="text-sm text-gray-500">Scans & Vulnerabilities</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Vulns</p>
          <p className="text-lg font-bold text-indigo-600">{STATS.totalVulnerabilities}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Critical</p>
          <p className="text-lg font-bold text-red-600">{STATS.criticalVulnerabilities}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Open Vulns</p>
          <p className="text-lg font-bold text-orange-600">{STATS.openVulnerabilities}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Scans (7d)</p>
          <p className="text-lg font-bold text-blue-600">{STATS.scansThisWeek}</p>
        </div>
      </div>

      <div className="space-y-3">
        {scans.map((scan) => (
          <div key={scan.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(scan.status)}`} />
                <span className="text-base font-bold text-gray-900">{scan.target}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(scan.status)}`}>{scan.status}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="px-2 py-0.5 bg-gray-100 rounded">{scan.scan_type}</span>
              <span>{scan.scanner}</span>
            </div>
            {scan.findings.length > 0 && (
              <div className="flex gap-2">
                {scan.findings.map((f) => (
                  <span key={f.severity} className={`text-xs font-medium ${f.severity === 'CRITICAL' || f.severity === 'HIGH' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {f.count} {f.severity}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
