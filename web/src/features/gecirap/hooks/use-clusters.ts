'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { ClusterService } from '../services';
import type {
  GecirapCluster,
} from '../repositories/container-orchestration-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-clusters';

function createService(): ClusterService {
  return new ClusterService();
}

export function useClusters(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCluster>>({
    queryKey: [QUERY_KEY, schoolId, params, filters],
    queryFn: () => service.listClusters(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateCluster() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createCluster(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createCluster = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createCluster,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateCluster() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: {
      schoolId: string;
      id: string;
      data: Record<string, unknown>;
    }) => service.updateCluster(payload.schoolId, payload.id, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const updateCluster = useCallback(
    (schoolId: string, id: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, id, data }),
    [mutation],
  );

  return {
    updateCluster,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useDeleteCluster() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; id: string }) =>
      service.deleteCluster(payload.schoolId, payload.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const deleteCluster = useCallback(
    (schoolId: string, id: string) =>
      mutation.mutateAsync({ schoolId, id }),
    [mutation],
  );

  return {
    deleteCluster,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
