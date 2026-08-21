'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { ZeroTrustService } from '../services';
import type { GestcrpZeroTrustPolicy } from '../repositories/zero-trust-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-zero-trust';

function createService(): ZeroTrustService {
  return new ZeroTrustService();
}

export function useZeroTrustPolicies(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpZeroTrustPolicy>>({
    queryKey: [QUERY_KEY, 'policies', schoolId, params, filters],
    queryFn: () => service.listPolicies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateZeroTrustPolicy() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createPolicy(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'policies', variables.schoolId],
      });
    },
  });

  const createPolicy = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createPolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateZeroTrustPolicy() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: {
      schoolId: string;
      id: string;
      data: Record<string, unknown>;
    }) => service.updatePolicy(payload.schoolId, payload.id, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'policies', variables.schoolId],
      });
    },
  });

  const updatePolicy = useCallback(
    (schoolId: string, id: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, id, data }),
    [mutation],
  );

  return {
    updatePolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useDeleteZeroTrustPolicy() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; id: string }) =>
      service.deletePolicy(payload.schoolId, payload.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'policies', variables.schoolId],
      });
    },
  });

  const deletePolicy = useCallback(
    (schoolId: string, id: string) =>
      mutation.mutateAsync({ schoolId, id }),
    [mutation],
  );

  return {
    deletePolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
