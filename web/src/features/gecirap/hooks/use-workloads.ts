'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { WorkloadService } from '../services';
import type {
  GecirapWorkload,
} from '../repositories/container-orchestration-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-workloads';

function createService(): WorkloadService {
  return new WorkloadService();
}

export function useWorkloads(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapWorkload>>({
    queryKey: [QUERY_KEY, schoolId, params, filters],
    queryFn: () => service.listWorkloads(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateWorkload() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createWorkload(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createWorkload = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createWorkload,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateWorkload() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: {
      schoolId: string;
      id: string;
      data: Record<string, unknown>;
    }) => service.updateWorkload(payload.schoolId, payload.id, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const updateWorkload = useCallback(
    (schoolId: string, id: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, id, data }),
    [mutation],
  );

  return {
    updateWorkload,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useDeleteWorkload() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; id: string }) =>
      service.deleteWorkload(payload.schoolId, payload.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const deleteWorkload = useCallback(
    (schoolId: string, id: string) =>
      mutation.mutateAsync({ schoolId, id }),
    [mutation],
  );

  return {
    deleteWorkload,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
