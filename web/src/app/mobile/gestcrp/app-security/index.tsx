'use client';

import { useState, useEffect } from 'react';

interface AppScan {
  id: string;
  scan_type: 'SAST' | 'DAST' | 'SCA' | 'IAST' | 'CONTAINER' | 'API' | 'SECRETS';
  target: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  findings: { severity: string; count: number }[];
  scanner: string;
  completed_at?: string;
}

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
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState<AppScan[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/app-security/scans');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json = await res.json();
      setScans(json.data || []);
    } catch {
      setScans([]);
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

  let totalVulns = 0;
  let criticalVulns = 0;
  let openVulns = 0;
  scans.forEach((s) => {
    (s.findings || []).forEach((f) => {
      totalVulns += f.count;
      if (f.severity === 'CRITICAL') criticalVulns += f.count;
    });
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

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
          <p className="text-lg font-bold text-indigo-600">{totalVulns}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Critical</p>
          <p className="text-lg font-bold text-red-600">{criticalVulns}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Scans</p>
          <p className="text-lg font-bold text-gray-900">{scans.length}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-lg font-bold text-green-600">{scans.filter((s) => s.status === 'COMPLETED').length}</p>
        </div>
      </div>

      {scans.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucun scan trouvé</p>
        </div>
      ) : (
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
              {scan.findings && scan.findings.length > 0 && (
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
      )}
    </div>
  );
}
