'use client';

import { useState, useCallback } from 'react';
import { useNetworks, useLoadBalancers, useDNSRecords } from '@/features/gecirap/hooks';

interface NetworkSummary { id: string; name: string; network_type: string; cidr_block?: string; region_code: string; is_active: boolean; }
interface LoadBalancerSummary { id: string; name: string; lb_type: string; scheme: string; status: string; ip_address?: string; }
interface DNSSummary { id: string; domain_name: string; record_type: string; record_name: string; is_active: boolean; }

function getStatusDot(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'degraded': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-400';
  }
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'vpc': return 'text-blue-700 bg-blue-50';
    case 'subnet': return 'text-purple-700 bg-purple-50';
    case 'application': return 'text-green-700 bg-green-50';
    case 'network': return 'text-orange-700 bg-orange-50';
    default: return 'text-gray-700 bg-gray-50';
  }
}

export default function NetworkPage() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: netData, isLoading: netsLoading, error: netsError, refetch: refetchNets } = useNetworks('current-school');
  const { data: lbData, isLoading: lbLoading, refetch: refetchLB } = useLoadBalancers('current-school');
  const { data: dnsData, isLoading: dnsLoading, refetch: refetchDNS } = useDNSRecords('current-school');

  const networks = netData?.data ?? [];
  const loadBalancers = lbData?.data ?? [];
  const dnsRecords = dnsData?.data ?? [];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refetchNets(), refetchLB(), refetchDNS()]).finally(() => setRefreshing(false));
  }, [refetchNets, refetchLB, refetchDNS]);

  const activeNetworks = networks.filter((n) => n.is_active).length;

  if (netsLoading || lbLoading || dnsLoading) {
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

  if (netsError) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load network data</p>
          <p className="text-sm text-gray-500 mb-4">{netsError.message}</p>
          <button onClick={handleRefresh} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (networks.length === 0 && loadBalancers.length === 0 && dnsRecords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Network</h1>
            <p className="text-sm text-gray-500">0 active networks</p>
          </div>
          <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">No network data available</p>
          <p className="text-gray-400 text-xs mt-1">Configure networks to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Network</h1>
          <p className="text-sm text-gray-500">{activeNetworks} active networks</p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-50">
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-blue-600">{networks.length}</p>
          <p className="text-xs text-gray-500">Networks</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-green-600">{loadBalancers.length}</p>
          <p className="text-xs text-gray-500">Load Balancers</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 text-center">
          <p className="text-xl font-bold text-purple-600">{dnsRecords.length}</p>
          <p className="text-xs text-gray-500">DNS Records</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Networks</h2>
        <div className="space-y-2">
          {networks.map((net) => (
            <div key={net.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(net.is_active ? 'active' : 'inactive')}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{net.name}</p>
                  <p className="text-xs text-gray-500">{net.cidr_block ?? 'N/A'} &middot; {net.region_code}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(net.network_type)}`}>
                {net.network_type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Load Balancers</h2>
        <div className="space-y-2">
          {loadBalancers.map((lb) => (
            <div key={lb.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(lb.status)}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{lb.name}</p>
                  <p className="text-xs text-gray-500">{lb.ip_address ?? 'N/A'} &middot; {lb.scheme}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getTypeColor(lb.lb_type)}`}>
                {lb.lb_type}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">DNS Records</h2>
        <div className="space-y-2">
          {dnsRecords.map((dns) => (
            <div key={dns.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${dns.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <p className="text-sm font-medium text-gray-700">{dns.record_name}.{dns.domain_name}</p>
                  <p className="text-xs text-gray-500">{dns.record_type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
