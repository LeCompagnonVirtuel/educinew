'use client';

import { useState } from 'react';

interface Device {
  id: string;
  name: string;
  platform: 'WINDOWS' | 'MACOS' | 'LINUX' | 'IOS' | 'ANDROID' | 'CHROME_OS';
  status: 'ONLINE' | 'OFFLINE' | 'SUSPENDED' | 'COMPROMISED' | 'QUARANTINED';
  owner: string;
  department: string;
  last_seen_at: string;
  compliance_status: { compliant: boolean };
}

const MOCK_DEVICES: Device[] = [
  { id: '1', name: 'Admin-Laptop-01', platform: 'WINDOWS', status: 'ONLINE', owner: 'Admin Principal', department: 'Direction', last_seen_at: '2026-08-08T10:00:00Z', compliance_status: { compliant: true } },
  { id: '2', name: 'Teacher-Tablet-03', platform: 'ANDROID', status: 'ONLINE', owner: 'Mme. Koné', department: 'Sciences', last_seen_at: '2026-08-08T09:30:00Z', compliance_status: { compliant: true } },
  { id: '3', name: 'Server-Prod-01', platform: 'LINUX', status: 'ONLINE', owner: 'IT Team', department: 'IT', last_seen_at: '2026-08-08T10:05:00Z', compliance_status: { compliant: true } },
  { id: '4', name: 'Student-Chromebook-12', platform: 'CHROME_OS', status: 'COMPROMISED', owner: 'Élève #4521', department: 'Students', last_seen_at: '2026-08-07T16:00:00Z', compliance_status: { compliant: false } },
  { id: '5', name: 'Office-PC-02', platform: 'WINDOWS', status: 'OFFLINE', owner: 'Secrétaire', department: 'Administration', last_seen_at: '2026-08-06T18:00:00Z', compliance_status: { compliant: true } },
];

const STATS = {
  totalDevices: 156,
  onlineDevices: 128,
  compromisedDevices: 2,
  complianceRate: 94.2,
};

function getStatusColor(status: string): string {
  switch (status) {
    case 'ONLINE': return 'bg-green-500';
    case 'OFFLINE': return 'bg-gray-400';
    case 'COMPROMISED': return 'bg-red-500';
    case 'QUARANTINED': return 'bg-yellow-500';
    case 'SUSPENDED': return 'bg-orange-500';
    default: return 'bg-gray-400';
  }
}

function getPlatformIcon(platform: string): string {
  switch (platform) {
    case 'WINDOWS': return '💻';
    case 'MACOS': return '🍎';
    case 'LINUX': return '🐧';
    case 'IOS': return '📱';
    case 'ANDROID': return '🤖';
    case 'CHROME_OS': return '🌐';
    default: return '❓';
  }
}

export default function DevicesPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [devices] = useState<Device[]>(MOCK_DEVICES);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Device Inventory</h1>
          <p className="text-sm text-gray-500">MDM & Compliance</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Devices</p>
          <p className="text-lg font-bold text-cyan-600">{STATS.totalDevices}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Online</p>
          <p className="text-lg font-bold text-green-600">{STATS.onlineDevices}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Compromised</p>
          <p className="text-lg font-bold text-red-600">{STATS.compromisedDevices}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Compliance Rate</p>
          <p className="text-lg font-bold text-blue-600">{STATS.complianceRate}%</p>
        </div>
      </div>

      <div className="space-y-3">
        {devices.map((device) => (
          <div key={device.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getPlatformIcon(device.platform)}</span>
                <span className="text-base font-bold text-gray-900">{device.name}</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusColor(device.status)}`} />
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
              <span>{device.platform}</span>
              <span>{device.department}</span>
              <span>{device.owner}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs font-medium ${device.compliance_status.compliant ? 'text-green-600' : 'text-red-600'}`}>
                {device.compliance_status.compliant ? 'Compliant' : 'Non-Compliant'}
              </span>
              <span className="text-xs text-gray-400">Last: {new Date(device.last_seen_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
