'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SimulationService } from '../services';
import { ScenarioService } from '../services';
import type {
  GedkinSimulation,
  GedkinScenario,
  GedkinScenarioRun,
  GedkinSimulationResult,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const SIMULATION_QUERY_KEY = 'gedkin-simulation';

function createSimulationService(): SimulationService {
  return new SimulationService();
}

function createScenarioService(): ScenarioService {
  return new ScenarioService();
}

export function useSimulations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createSimulationService(), []);

  return useQuery<PaginatedResult<GedkinSimulation>>({
    queryKey: [SIMULATION_QUERY_KEY, 'simulations', schoolId, params, filters],
    queryFn: () => service.listSimulations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateSimulation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createSimulationService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createSimulation(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_QUERY_KEY, 'simulations', schoolId],
      });
    },
  });
}

export function useScenarios(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createScenarioService(), []);

  return useQuery<PaginatedResult<GedkinScenario>>({
    queryKey: [SIMULATION_QUERY_KEY, 'scenarios', schoolId, params, filters],
    queryFn: () => service.listScenarios(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateScenario(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createScenarioService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createScenario(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_QUERY_KEY, 'scenarios', schoolId],
      });
    },
  });
}

export function useScenarioRuns(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createScenarioService(), []);

  return useQuery<PaginatedResult<GedkinScenarioRun>>({
    queryKey: [SIMULATION_QUERY_KEY, 'runs', schoolId, params, filters],
    queryFn: () => service.listRuns(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useSimulationResults(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createScenarioService(), []);

  return useQuery<PaginatedResult<GedkinSimulationResult>>({
    queryKey: [SIMULATION_QUERY_KEY, 'results', schoolId, params, filters],
    queryFn: () => service.listResults(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
