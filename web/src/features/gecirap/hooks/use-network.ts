'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { NetworkService } from '../services';
import { CDNService } from '../services';
import type {
  GecirapNetwork,
  GecirapNetworkRoute,
  GecirapLoadBalancer,
  GecirapDNSRecord,
} from '../repositories/network-repository';
import type {
  GecirapCDNDistribution,
} from '../repositories/network-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const NETWORK_QUERY_KEY = 'gecirap-network';
const CDN_QUERY_KEY = 'gecirap-cdn';

function createNetworkService(): NetworkService {
  return new NetworkService();
}

function createCDNService(): CDNService {
  return new CDNService();
}

export function useNetworks(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createNetworkService(), []);

  return useQuery<PaginatedResult<GecirapNetwork>>({
    queryKey: [NETWORK_QUERY_KEY, 'networks', schoolId, params, filters],
    queryFn: () => service.listNetworks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useNetworkRoutes(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createNetworkService(), []);

  return useQuery<PaginatedResult<GecirapNetworkRoute>>({
    queryKey: [NETWORK_QUERY_KEY, 'routes', schoolId, params],
    queryFn: () => service.listRoutes(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useLoadBalancers(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createNetworkService(), []);

  return useQuery<PaginatedResult<GecirapLoadBalancer>>({
    queryKey: [NETWORK_QUERY_KEY, 'load-balancers', schoolId, params],
    queryFn: () => service.listLoadBalancers(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCDNDistributions(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createCDNService(), []);

  return useQuery<PaginatedResult<GecirapCDNDistribution>>({
    queryKey: [CDN_QUERY_KEY, 'distributions', schoolId, params, filters],
    queryFn: () => service.listDistributions(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useDNSRecords(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createNetworkService(), []);

  return useQuery<PaginatedResult<GecirapDNSRecord>>({
    queryKey: [NETWORK_QUERY_KEY, 'dns-records', schoolId, params],
    queryFn: () => service.listDNSRecords(schoolId, params),
    enabled: !!schoolId,
  });
}
