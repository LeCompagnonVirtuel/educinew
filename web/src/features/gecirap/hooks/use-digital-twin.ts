'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { InfrastructureTwinService } from '../services';
import { SimulationService } from '../services';
import type {
  GecirapInfrastructureTwin,
  GecirapTwinSimulation,
  GecirapTwinScenario,
  GecirapTwinResult,
} from '../repositories/digital-twin-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const TWIN_QUERY_KEY = 'gecirap-digital-twin';
const SIMULATION_QUERY_KEY = 'gecirap-twin-simulation';

function createTwinService(): InfrastructureTwinService {
  return new InfrastructureTwinService();
}

function createSimulationService(): SimulationService {
  return new SimulationService();
}

export function useInfrastructureTwins(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createTwinService(), []);

  return useQuery<PaginatedResult<GecirapInfrastructureTwin>>({
    queryKey: [TWIN_QUERY_KEY, 'twins', schoolId, params, filters],
    queryFn: () => service.listTwins(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateTwin() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createTwinService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createTwin(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [TWIN_QUERY_KEY, variables.schoolId],
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

export function useTwinSimulations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createSimulationService(), []);

  return useQuery<PaginatedResult<GecirapTwinSimulation>>({
    queryKey: [SIMULATION_QUERY_KEY, 'simulations', schoolId, params, filters],
    queryFn: () => service.listSimulations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useTwinScenarios(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createSimulationService(), []);

  return useQuery<PaginatedResult<GecirapTwinScenario>>({
    queryKey: [SIMULATION_QUERY_KEY, 'scenarios', schoolId, params, filters],
    queryFn: () => service.listScenarios(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useTwinResults(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createSimulationService(), []);

  return useQuery<PaginatedResult<GecirapTwinResult>>({
    queryKey: [SIMULATION_QUERY_KEY, 'results', schoolId, params],
    queryFn: () => service.listResults(schoolId, params),
    enabled: !!schoolId,
  });
}
