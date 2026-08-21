'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { CyberTwinService } from '../services';
import type { GestcrpCyberDigitalTwin, GestcrpTwinResult } from '../repositories/cyber-twin-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-cyber-twin';

function createService(): CyberTwinService {
  return new CyberTwinService();
}

export function useCyberDigitalTwins(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpCyberDigitalTwin>>({
    queryKey: [QUERY_KEY, 'twins', schoolId, params, filters],
    queryFn: () => service.listTwins(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateCyberDigitalTwin() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createTwin(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'twins', variables.schoolId],
      });
    },
  });

  const createTwin = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createTwin,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useTwinResults(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpTwinResult>>({
    queryKey: [QUERY_KEY, 'results', schoolId, params],
    queryFn: () => service.listResults(schoolId, params),
    enabled: !!schoolId,
  });
}
