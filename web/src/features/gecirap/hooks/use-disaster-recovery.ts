'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { DisasterRecoveryService } from '../services';
import type {
  GecirapDisasterRecoveryPlan,
  GecirapRecoveryExecution,
  GecirapRecoveryTest,
} from '../repositories/disaster-recovery-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-disaster-recovery';

function createService(): DisasterRecoveryService {
  return new DisasterRecoveryService();
}

export function useDRPlans(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapDisasterRecoveryPlan>>({
    queryKey: [QUERY_KEY, 'plans', schoolId, params, filters],
    queryFn: () => service.listPlans(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateDRPlan() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createPlan(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createDRPlan = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createDRPlan,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useRecoveryExecutions(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapRecoveryExecution>>({
    queryKey: [QUERY_KEY, 'executions', schoolId, params],
    queryFn: () => service.listExecutions(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useRecoveryTests(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapRecoveryTest>>({
    queryKey: [QUERY_KEY, 'tests', schoolId, params],
    queryFn: () => service.listTests(schoolId, params),
    enabled: !!schoolId,
  });
}
