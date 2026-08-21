'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipImpactIntelligenceService } from '../services/impact-intelligence.service';
import type {
  GeaesipImpactModel,
  GeaesipImpactResult,
  GeaesipEconomicForecast,
  GeaesipHumanCapitalIndex,
} from '@educi/types';

const QUERY_KEY = 'geaesip-impact-intelligence';

function createService(): GeaesipImpactIntelligenceService {
  return new GeaesipImpactIntelligenceService();
}

export function useImpactModels(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipImpactModel[]>({
    queryKey: [QUERY_KEY, 'models', schoolId],
    queryFn: () => service.listModels(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateImpactModel(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createModel(schoolId, data as Omit<GeaesipImpactModel, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'models', schoolId] });
    },
  });
}

export function useUpdateImpactModel(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipImpactModel, 'id' | 'createdAt'>> }) =>
      service.updateModel(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'models', schoolId] });
    },
  });
}

export function useDeleteImpactModel(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteModel(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'models', schoolId] });
    },
  });
}

export function useImpactResults(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipImpactResult[]>({
    queryKey: [QUERY_KEY, 'results', schoolId],
    queryFn: () => service.listResults(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateImpactResult(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createResult(schoolId, data as Omit<GeaesipImpactResult, 'id' | 'calculatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'results', schoolId] });
    },
  });
}

export function useEconomicForecasts(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEconomicForecast[]>({
    queryKey: [QUERY_KEY, 'economic-forecasts', schoolId],
    queryFn: () => service.listEconomicForecasts(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateEconomicForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createEconomicForecast(schoolId, data as Omit<GeaesipEconomicForecast, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'economic-forecasts', schoolId] });
    },
  });
}

export function useHumanCapitalIndices(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipHumanCapitalIndex[]>({
    queryKey: [QUERY_KEY, 'human-capital', schoolId],
    queryFn: () => service.listHumanCapitalIndices(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateHumanCapitalIndex(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createHumanCapitalIndex(schoolId, data as Omit<GeaesipHumanCapitalIndex, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'human-capital', schoolId] });
    },
  });
}

export function useImpactIntelligenceStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getImpactIntelligenceStats(schoolId),
    enabled: !!schoolId,
  });
}
