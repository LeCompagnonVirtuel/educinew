'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { MultiCloudService } from '../services';
import type {
  GecirapCloudPlacementDecision,
  GecirapCloudMigration,
  GecirapCloudBalance,
} from '../repositories/multi-cloud-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-multi-cloud';

function createService(): MultiCloudService {
  return new MultiCloudService();
}

export function usePlacementDecisions(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCloudPlacementDecision>>({
    queryKey: [QUERY_KEY, 'placements', schoolId, params, filters],
    queryFn: () => service.listPlacements(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCloudMigrations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCloudMigration>>({
    queryKey: [QUERY_KEY, 'migrations', schoolId, params, filters],
    queryFn: () => service.listMigrations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCloudBalances(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCloudBalance>>({
    queryKey: [QUERY_KEY, 'balances', schoolId, params],
    queryFn: () => service.listBalances(schoolId, params),
    enabled: !!schoolId,
  });
}
