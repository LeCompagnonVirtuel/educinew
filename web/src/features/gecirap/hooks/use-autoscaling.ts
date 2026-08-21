'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { AutoscalingService } from '../services';
import type {
  GecirapScalingPolicy,
  GecirapScalingEvent,
} from '../repositories/autoscaling-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-autoscaling';

function createService(): AutoscalingService {
  return new AutoscalingService();
}

export function useScalingPolicies(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapScalingPolicy>>({
    queryKey: [QUERY_KEY, 'policies', schoolId, params, filters],
    queryFn: () => service.listPolicies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateScalingPolicy() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createPolicy(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const createScalingPolicy = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createScalingPolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateScalingPolicy() {
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
        queryKey: [QUERY_KEY, variables.schoolId],
      });
    },
  });

  const updateScalingPolicy = useCallback(
    (schoolId: string, id: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, id, data }),
    [mutation],
  );

  return {
    updateScalingPolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useScalingEvents(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapScalingEvent>>({
    queryKey: [QUERY_KEY, 'events', schoolId, params],
    queryFn: () => service.listEvents(schoolId, params),
    enabled: !!schoolId,
  });
}
