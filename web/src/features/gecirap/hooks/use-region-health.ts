'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { RegionService } from '../services';
import type {
  GecirapRegionHealth,
  GecirapRegionPolicy,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-region-health';

function createService(): RegionService {
  return new RegionService();
}

export function useRegionHealth(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapRegionHealth>>({
    queryKey: [QUERY_KEY, 'health', schoolId, params],
    queryFn: () => service.listHealth(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useRegionPolicies(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapRegionPolicy>>({
    queryKey: [QUERY_KEY, 'policies', schoolId, params],
    queryFn: () => service.listPolicies(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCreateRegionPolicy() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createPolicy(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createRegionPolicy = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createRegionPolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
