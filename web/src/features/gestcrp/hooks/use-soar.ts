'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { SOARService } from '../services';
import type { GestcrpSOARPlaybook, GestcrpSOARExecution } from '../repositories/soar-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-soar';

function createService(): SOARService {
  return new SOARService();
}

export function useSOARPlaybooks(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpSOARPlaybook>>({
    queryKey: [QUERY_KEY, 'playbooks', schoolId, params, filters],
    queryFn: () => service.listPlaybooks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateSOARPlaybook() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createPlaybook(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'playbooks', variables.schoolId],
      });
    },
  });

  const createPlaybook = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createPlaybook,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useSOARExecutions(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpSOARExecution>>({
    queryKey: [QUERY_KEY, 'executions', schoolId, params],
    queryFn: () => service.listExecutions(schoolId, params),
    enabled: !!schoolId,
  });
}
