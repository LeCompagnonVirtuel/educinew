'use client';

import { useState, useCallback } from 'react';
import { useGeoRegions, useRegionHealth } from '@/features/gecirap/hooks';

interface RegionDetail {
  id: string;
  name: string;
  display_name: string;
  code: string;
  continent: string;
  country: string;
  timezone: string;
  is_active: boolean;
  latitude?: number;
  longitude?: number;
}

interface HealthEntry {
  id: string;
  status: string;
  latency_ms?: number;
  availability_percent?: number;
  last_checked_at: string;
}

const MOCK_DETAIL: RegionDetail = {
  id: '1',
  name: 'west-africa',
  display_name: 'West Africa',
  code: 'WA',
  continent: 'Africa',
  country: 'Senegal',
  timezone: 'Africa/Dakar',
  is_active: true,
  latitude: 14.7167,
  longitude: -17.4677,
};

const MOCK_HEALTH: HealthEntry[] = [
  { id: '1', status: 'healthy', latency_ms: 12, availability_percent: 99.95, last_checked_at: new Date().toISOString() },
  { id: '2', status: 'degraded', latency_ms: 85, availability_percent: 98.2, last_checked_at: new Date().toISOString() },
];

function getStatusColor(status: string): string {
  switch (status) {
    case 'healthy': return 'text-green-600 bg-green-50';
    case 'degraded': return 'text-yellow-600 bg-yellow-50';
    case 'critical': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function RegionDetailPage() {
  const [region] = useState<RegionDetail>(MOCK_DETAIL);
  const { refetch: refetchRegions } = useGeoRegions('current-school');
  const { data: healthData, isLoading: healthLoading, refetch: refetchHealth } = useRegionHealth('current-school');

  const healthEntries = healthData?.data ?? MOCK_HEALTH;

  const handleRefresh = useCallback(() => {
    refetchRegions();
    refetchHealth();
  }, [refetchRegions, refetchHealth]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Region Detail</p>
        <h1 className="text-xl font-bold text-gray-900">{region.display_name}</h1>
        <p className="text-sm text-gray-600 mt-1">{region.country} &middot; {region.timezone}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Status</p>
          <p className={`text-lg font-bold ${region.is_active ? 'text-green-600' : 'text-gray-400'}`}>
            {region.is_active ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Code</p>
          <p className="text-lg font-bold text-gray-900">{region.code}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Latitude</p>
          <p className="text-lg font-bold text-gray-900">{region.latitude ?? 'N/A'}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Longitude</p>
          <p className="text-lg font-bold text-gray-900">{region.longitude ?? 'N/A'}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Health History</h2>
        {healthLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {healthEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(entry.status)}`}>
                    {entry.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {entry.latency_ms != null ? `${entry.latency_ms}ms` : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{entry.availability_percent ?? 'N/A'}%</p>
                  <p className="text-xs text-gray-400">availability</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleRefresh}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
      >
        Refresh Data
      </button>
    </div>
  );
}
