'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { SIEMService } from '../services';
import type { GestcrpSIEMEvent, GestcrpSIEMRule } from '../repositories/siem-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-siem';

function createService(): SIEMService {
  return new SIEMService();
}

export function useSIEMEvents(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpSIEMEvent>>({
    queryKey: [QUERY_KEY, 'events', schoolId, params, filters],
    queryFn: () => service.listEvents(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useSIEMRules(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpSIEMRule>>({
    queryKey: [QUERY_KEY, 'rules', schoolId, params],
    queryFn: () => service.listRules(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCreateSIEMRule() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createRule(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'rules', variables.schoolId],
      });
    },
  });

  const createRule = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createRule,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateSIEMRule() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: {
      schoolId: string;
      id: string;
      data: Record<string, unknown>;
    }) => service.updateRule(payload.schoolId, payload.id, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'rules', variables.schoolId],
      });
    },
  });

  const updateRule = useCallback(
    (schoolId: string, id: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, id, data }),
    [mutation],
  );

  return {
    updateRule,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
