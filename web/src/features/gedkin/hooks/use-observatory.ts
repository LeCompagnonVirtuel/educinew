'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ObservatoryService } from '../services';
import type {
  GedkinObservatoryIndicator,
  GedkinObservatoryDashboard,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const OBSERVATORY_QUERY_KEY = 'gedkin-observatory';

function createService(): ObservatoryService {
  return new ObservatoryService();
}

export function useObservatoryIndicators(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinObservatoryIndicator>>({
    queryKey: [OBSERVATORY_QUERY_KEY, 'indicators', schoolId, params, filters],
    queryFn: () => service.listIndicators(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateIndicator(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createIndicator(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OBSERVATORY_QUERY_KEY, 'indicators', schoolId],
      });
    },
  });
}

export function useObservatoryDashboards(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinObservatoryDashboard>>({
    queryKey: [OBSERVATORY_QUERY_KEY, 'dashboards', schoolId, params, filters],
    queryFn: () => service.listDashboards(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateDashboard(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDashboard(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [OBSERVATORY_QUERY_KEY, 'dashboards', schoolId],
      });
    },
  });
}
