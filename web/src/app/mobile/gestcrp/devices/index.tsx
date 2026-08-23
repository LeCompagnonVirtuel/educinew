'use client';

import { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/security/devices/inventory');
      if (!res.ok) throw new Error('Erreur de chargement');
      const json = await res.json();
      setDevices(json.data || []);
    } catch {
      setDevices([]);
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

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === 'ONLINE').length;
  const compromisedDevices = devices.filter((d) => d.status === 'COMPROMISED').length;
  const compliantDevices = devices.filter((d) => d.compliance_status?.compliant).length;
  const complianceRate = totalDevices > 0 ? Math.round((compliantDevices / totalDevices) * 100) : 0;

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
          <p className="text-lg font-bold text-cyan-600">{totalDevices}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Online</p>
          <p className="text-lg font-bold text-green-600">{onlineDevices}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Compromised</p>
          <p className="text-lg font-bold text-red-600">{compromisedDevices}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Compliance Rate</p>
          <p className="text-lg font-bold text-blue-600">{complianceRate}%</p>
        </div>
      </div>

      {devices.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Aucun appareil trouvé</p>
        </div>
      ) : (
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
                <span className={`text-xs font-medium ${device.compliance_status?.compliant ? 'text-green-600' : 'text-red-600'}`}>
                  {device.compliance_status?.compliant ? 'Compliant' : 'Non-Compliant'}
                </span>
                <span className="text-xs text-gray-400">Last: {new Date(device.last_seen_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
