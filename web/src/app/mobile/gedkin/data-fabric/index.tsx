'use client';

import { useState, useCallback } from 'react';
import { useDataDomains, useDataProducts, useDataSource, useDataContract } from '@/features/gedkin/hooks';

interface DomainSummary {
  id: string;
  name: string;
  description: string;
  product_count: number;
  quality_score: number;
  status: string;
}

const FALLBACK_DOMAINS: DomainSummary[] = [
  { id: '1', name: 'Student Performance', description: 'Academic results and progress tracking', product_count: 8, quality_score: 0.92, status: 'active' },
  { id: '2', name: 'Financial Operations', description: 'Fee collection and accounting data', product_count: 5, quality_score: 0.88, status: 'active' },
  { id: '3', name: 'Human Resources', description: 'Staff and teacher management', product_count: 4, quality_score: 0.85, status: 'active' },
  { id: '4', name: 'Infrastructure', description: 'Facilities and transport data', product_count: 3, quality_score: 0.78, status: 'review' },
  { id: '5', name: 'Health & Wellness', description: 'Student health and nutrition records', product_count: 3, quality_score: 0.91, status: 'active' },
];

function getQualityColor(score: number): string {
  if (score >= 0.9) return 'text-green-600';
  if (score >= 0.8) return 'text-yellow-600';
  return 'text-red-600';
}

function getQualityBg(score: number): string {
  if (score >= 0.9) return 'bg-green-500';
  if (score >= 0.8) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default function DataFabricPage() {
  const [refreshing, setRefreshing] = useState(false);
  const domains = useDataDomains('current-school');
  const products = useDataProducts('current-school');
  const sources = useDataSource('current-school');
  const contracts = useDataContract('current-school');

  const isLoading = domains.isLoading || products.isLoading || sources.isLoading || contracts.isLoading;
  const hasError = domains.error || products.error || sources.error || contracts.error;

  const domainList = domains.data?.data ?? FALLBACK_DOMAINS;
  const totalProducts = products.data?.total ?? 23;
  const totalSources = sources.data?.total ?? 15;
  const totalContracts = contracts.data?.total ?? 8;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([domains.refetch(), products.refetch(), sources.refetch(), contracts.refetch()])
      .finally(() => setRefreshing(false));
  }, [domains, products, sources, contracts]);

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

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load data fabric</p>
          <p className="text-sm text-gray-500 mb-4">An error occurred while fetching domains</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Data Fabric</h1>
          <p className="text-sm text-gray-500">Data domains and products overview</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{domainList.length}</p>
          <p className="text-xs text-gray-500">Domains</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{totalProducts}</p>
          <p className="text-xs text-gray-500">Products</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{totalSources}</p>
          <p className="text-xs text-gray-500">Sources</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Data Domains</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {domainList.map((domain) => (
            <div key={domain.id} className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-900">{domain.name}</span>
                <span className={`text-xs font-bold ${getQualityColor(domain.quality_score)}`}>
                  {(domain.quality_score * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{domain.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{domain.product_count} products</span>
                <span className="text-xs text-gray-400">&middot;</span>
                <span className={`text-xs ${domain.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{domain.status}</span>
              </div>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${getQualityBg(domain.quality_score)}`} style={{ width: `${domain.quality_score * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-3 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Data Contracts</h2>
          <p className="text-xs text-gray-500">{totalContracts} active contracts</p>
        </div>
        <div className="p-3 text-center">
          <p className="text-sm text-gray-500">View all contracts in the full dashboard</p>
        </div>
      </div>
    </div>
  );
}
