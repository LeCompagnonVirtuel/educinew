'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { BCPService } from '../services';
import type {
  GestcrpBCPPlan,
  GestcrpBackupPolicy,
  GestcrpBackupJob,
  GestcrpDRTestResult,
} from '../repositories/bcp-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-bcp';

function createService(): BCPService {
  return new BCPService();
}

export function useBCPPlans(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpBCPPlan>>({
    queryKey: [QUERY_KEY, 'plans', schoolId, params, filters],
    queryFn: () => service.listPlans(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateBCPPlan() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createPlan(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'plans', variables.schoolId],
      });
    },
  });

  const createPlan = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createPlan,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useBackupPolicies(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpBackupPolicy>>({
    queryKey: [QUERY_KEY, 'backup-policies', schoolId, params],
    queryFn: () => service.listBackupPolicies(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useBackupJobs(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpBackupJob>>({
    queryKey: [QUERY_KEY, 'backup-jobs', schoolId, params],
    queryFn: () => service.listBackupJobs(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useDRTestResults(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpDRTestResult>>({
    queryKey: [QUERY_KEY, 'dr-test-results', schoolId, params],
    queryFn: () => service.listDRTestResults(schoolId, params),
    enabled: !!schoolId,
  });
}
