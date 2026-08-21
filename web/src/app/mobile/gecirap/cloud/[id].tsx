'use client';

import { useState, useCallback } from 'react';
import { useCloudProviders } from '@/features/gecirap/hooks';

interface CloudProviderDetail {
  id: string;
  name: string;
  display_name: string;
  provider_type: string;
  auth_method: string;
  is_active: boolean;
  base_url?: string;
  metadata?: Record<string, unknown>;
}

const MOCK_DETAIL: CloudProviderDetail = {
  id: '1',
  name: 'aws',
  display_name: 'Amazon Web Services',
  provider_type: 'aws',
  auth_method: 'iam_role',
  is_active: true,
  base_url: 'https://api.aws.amazon.com',
  metadata: { region: 'us-east-1', account_id: '123456789012' },
};

function getProviderColor(type: string): string {
  switch (type) {
    case 'aws': return 'text-orange-600 bg-orange-50';
    case 'gcp': return 'text-blue-600 bg-blue-50';
    case 'azure': return 'text-sky-600 bg-sky-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function CloudProviderDetailPage() {
  const [provider] = useState<CloudProviderDetail>(MOCK_DETAIL);
  const { refetch } = useCloudProviders('current-school');

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Cloud Provider Detail</p>
        <h1 className="text-xl font-bold text-gray-900">{provider.display_name}</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Status</p>
          <p className={`text-lg font-bold ${provider.is_active ? 'text-green-600' : 'text-gray-400'}`}>
            {provider.is_active ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Provider</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${getProviderColor(provider.provider_type)}`}>
            {provider.provider_type.toUpperCase()}
          </span>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Auth Method</p>
          <p className="text-lg font-bold text-gray-900">{provider.auth_method}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Base URL</p>
          <p className="text-sm font-medium text-gray-700 truncate">{provider.base_url ?? 'N/A'}</p>
        </div>
      </div>

      {provider.metadata && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Metadata</h2>
          <div className="space-y-2">
            {Object.entries(provider.metadata).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{key}</span>
                <span className="text-sm text-gray-500">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleRefresh}
        className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
      >
        Refresh Data
      </button>
    </div>
  );
}
