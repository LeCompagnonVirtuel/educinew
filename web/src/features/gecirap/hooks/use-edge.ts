'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { EdgeService } from '../services';
import { EdgeSyncService } from '../services';
import type {
  GecirapEdgeNode,
  GecirapEdgeDeployment,
  GecirapEdgeSyncJob,
  GecirapOfflinePackage,
} from '../repositories/edge-computing-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const EDGE_QUERY_KEY = 'gecirap-edge';
const SYNC_QUERY_KEY = 'gecirap-edge-sync';

function createEdgeService(): EdgeService {
  return new EdgeService();
}

function createSyncService(): EdgeSyncService {
  return new EdgeSyncService();
}

export function useEdgeNodes(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createEdgeService(), []);

  return useQuery<PaginatedResult<GecirapEdgeNode>>({
    queryKey: [EDGE_QUERY_KEY, 'nodes', schoolId, params, filters],
    queryFn: () => service.listNodes(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateEdgeNode() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createEdgeService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createNode(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [EDGE_QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createEdgeNode = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createEdgeNode,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useEdgeDeployments(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createEdgeService(), []);

  return useQuery<PaginatedResult<GecirapEdgeDeployment>>({
    queryKey: [EDGE_QUERY_KEY, 'deployments', schoolId, params],
    queryFn: () => service.listDeployments(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useEdgeSyncJobs(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createSyncService(), []);

  return useQuery<PaginatedResult<GecirapEdgeSyncJob>>({
    queryKey: [SYNC_QUERY_KEY, 'jobs', schoolId, params, filters],
    queryFn: () => service.listSyncJobs(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useOfflinePackages(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createSyncService(), []);

  return useQuery<PaginatedResult<GecirapOfflinePackage>>({
    queryKey: [SYNC_QUERY_KEY, 'packages', schoolId, params],
    queryFn: () => service.listPackages(schoolId, params),
    enabled: !!schoolId,
  });
}
