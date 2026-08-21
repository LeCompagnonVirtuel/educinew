'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { FailoverService } from '../services';
import type {
  GecirapFailoverPolicy,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-failover';

function createService(): FailoverService {
  return new FailoverService();
}

export function useFailoverPolicies(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapFailoverPolicy>>({
    queryKey: [QUERY_KEY, 'policies', schoolId, params, filters],
    queryFn: () => service.listPolicies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateFailoverPolicy() {
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

  const createFailoverPolicy = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createFailoverPolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useEvaluateFailover(schoolId: string, sourceRegionId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'evaluate', schoolId, sourceRegionId],
    queryFn: () => service.evaluateFailover(schoolId, sourceRegionId),
    enabled: !!schoolId && !!sourceRegionId,
  });
}
