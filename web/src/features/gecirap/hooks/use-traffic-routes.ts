'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { GeoRoutingService } from '../services';
import type {
  GecirapTrafficRoute,
} from '../repositories/multi-region-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-traffic-routes';

function createService(): GeoRoutingService {
  return new GeoRoutingService();
}

export function useTrafficRoutes(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapTrafficRoute>>({
    queryKey: [QUERY_KEY, schoolId, params, filters],
    queryFn: () => service.listRoutes(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateTrafficRoute() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createRoute(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createTrafficRoute = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createTrafficRoute,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateTrafficRoute() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: {
      schoolId: string;
      id: string;
      data: Record<string, unknown>;
    }) => service.updateRoute(payload.schoolId, payload.id, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const updateTrafficRoute = useCallback(
    (schoolId: string, id: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, id, data }),
    [mutation],
  );

  return {
    updateTrafficRoute,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
