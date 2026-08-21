'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipScenarioSimulatorService } from '../services/scenario-simulator.service';
import type {
  GeaesipScenario,
  GeaesipScenarioRun,
  GeaesipScenarioComparison,
} from '@educi/types';

const QUERY_KEY = 'geaesip-scenario-simulator';

function createService(): GeaesipScenarioSimulatorService {
  return new GeaesipScenarioSimulatorService();
}

export function useScenarios(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipScenario[]>({
    queryKey: [QUERY_KEY, 'scenarios', schoolId],
    queryFn: () => service.listScenarios(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateScenario(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createScenario(schoolId, data as Omit<GeaesipScenario, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'scenarios', schoolId] });
    },
  });
}

export function useUpdateScenario(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipScenario, 'id' | 'createdAt'>> }) =>
      service.updateScenario(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'scenarios', schoolId] });
    },
  });
}

export function useDeleteScenario(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteScenario(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'scenarios', schoolId] });
    },
  });
}

export function useScenarioRuns(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipScenarioRun[]>({
    queryKey: [QUERY_KEY, 'runs', schoolId],
    queryFn: () => service.listRuns(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateScenarioRun(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createRun(schoolId, data as Omit<GeaesipScenarioRun, 'id' | 'createdAt' | 'completedAt' | 'results' | 'impacts' | 'risks' | 'costs' | 'benefits' | 'probabilities' | 'timeline' | 'recommendations'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runs', schoolId] });
    },
  });
}

export function useCompleteScenarioRun(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { results: Record<string, unknown>; impacts: Record<string, unknown>; risks: string[] } }) =>
      service.completeRun(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runs', schoolId] });
    },
  });
}

export function useScenarioComparisons(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipScenarioComparison[]>({
    queryKey: [QUERY_KEY, 'comparisons', schoolId],
    queryFn: () => service.listComparisons(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateScenarioComparison(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createComparison(schoolId, data as Omit<GeaesipScenarioComparison, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'comparisons', schoolId] });
    },
  });
}

export function useScenarioSimulatorStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getScenarioSimulatorStats(schoolId),
    enabled: !!schoolId,
  });
}
