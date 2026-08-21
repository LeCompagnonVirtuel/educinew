'use client';

import { useState, useCallback } from 'react';
import { useGeoRegions } from '@/features/gecirap/hooks';

interface RegionSummary {
  id: string;
  name: string;
  display_name: string;
  code: string;
  continent: string;
  country: string;
  is_active: boolean;
}

const FALLBACK_REGIONS: RegionSummary[] = [
  { id: '1', name: 'west-africa', display_name: 'West Africa', code: 'WA', continent: 'Africa', country: 'Senegal', is_active: true },
  { id: '2', name: 'east-africa', display_name: 'East Africa', code: 'EA', continent: 'Africa', country: 'Kenya', is_active: true },
  { id: '3', name: 'europe', display_name: 'Europe', code: 'EU', continent: 'Europe', country: 'France', is_active: true },
  { id: '4', name: 'north-america', display_name: 'North America', code: 'NA', continent: 'America', country: 'USA', is_active: false },
];

function getContinentColor(continent: string): string {
  switch (continent) {
    case 'Africa': return 'text-green-700 bg-green-50';
    case 'Europe': return 'text-blue-700 bg-blue-50';
    case 'America': return 'text-purple-700 bg-purple-50';
    case 'Asia': return 'text-orange-700 bg-orange-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function RegionsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useGeoRegions('current-school');
  const regions = data?.data ?? FALLBACK_REGIONS;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const activeCount = regions.filter((r) => r.is_active).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load regions</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Regions</h1>
          <p className="text-sm text-gray-500">{activeCount} active / {regions.length} total</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{regions.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{new Set(regions.map((r) => r.continent)).size}</p>
          <p className="text-xs text-gray-500">Continents</p>
        </div>
      </div>

      <div className="space-y-3">
        {regions.map((region) => (
          <div key={region.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900">{region.display_name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${region.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getContinentColor(region.continent)}`}>
                {region.continent}
              </span>
              <span className="text-xs text-gray-500">{region.country}</span>
              <span className="text-xs text-gray-400">{region.code}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
