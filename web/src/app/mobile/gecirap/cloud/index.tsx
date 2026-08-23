'use client';

import { useState, useCallback } from 'react';
import { useCloudProviders } from '@/features/gecirap/hooks';

interface CloudProviderSummary {
  id: string;
  name: string;
  display_name: string;
  provider_type: string;
  is_active: boolean;
  status: 'healthy' | 'warning' | 'critical';
}

function getProviderColor(type: string): string {
  switch (type) {
    case 'aws': return 'text-orange-600 bg-orange-50';
    case 'gcp': return 'text-blue-600 bg-blue-50';
    case 'azure': return 'text-sky-600 bg-sky-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

function getStatusDot(status: string): string {
  switch (status) {
    case 'healthy': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'critical': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

export default function CloudProvidersPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error, refetch } = useCloudProviders('current-school');
  const providers = data?.data ?? [];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const activeCount = providers.filter((p) => p.is_active).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
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
          <p className="text-red-600 font-semibold mb-2">Failed to load providers</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Cloud Providers</h1>
            <p className="text-sm text-gray-500">0 active / 0 total</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">No cloud providers configured</p>
          <p className="text-gray-400 text-xs mt-1">Add a provider to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Cloud Providers</h1>
          <p className="text-sm text-gray-500">{activeCount} active / {providers.length} total</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{activeCount}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-gray-600">{providers.length - activeCount}</p>
          <p className="text-xs text-gray-500">Inactive</p>
        </div>
      </div>

      <div className="space-y-3">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-bold text-gray-900">{provider.display_name}</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(provider.status)}`} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getProviderColor(provider.provider_type)}`}>
                {provider.provider_type.toUpperCase()}
              </span>
              <span className={`text-xs ${provider.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                {provider.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
