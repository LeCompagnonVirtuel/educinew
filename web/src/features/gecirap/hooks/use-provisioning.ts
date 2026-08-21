'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { ProvisioningService } from '../services';
import type {
  GecirapInfrastructureStack,
  GecirapProvisioningJob,
} from '../repositories/infrastructure-as-code-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-provisioning';

function createService(): ProvisioningService {
  return new ProvisioningService();
}

export function useInfrastructureStacks(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapInfrastructureStack>>({
    queryKey: [QUERY_KEY, 'stacks', schoolId, params, filters],
    queryFn: () => service.listStacks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useProvisioningJobs(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapProvisioningJob>>({
    queryKey: [QUERY_KEY, 'jobs', schoolId, params],
    queryFn: () => service.listJobs(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCreateStack() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createStack(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createStack = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createStack,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
