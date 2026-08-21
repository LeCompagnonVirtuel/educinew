'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipRiskResilienceService } from '../services/risk-resilience.service';
import type {
  GeaesipRiskRegistry,
  GeaesipRiskMatrix,
  GeaesipEarlyWarning,
  GeaesipMitigationPlan,
} from '@educi/types';

const QUERY_KEY = 'geaesip-risk-resilience';

function createService(): GeaesipRiskResilienceService {
  return new GeaesipRiskResilienceService();
}

export function useRisks(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipRiskRegistry[]>({
    queryKey: [QUERY_KEY, 'risks', schoolId],
    queryFn: () => service.listRisks(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateRisk(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createRisk(schoolId, data as Omit<GeaesipRiskRegistry, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'risks', schoolId] });
    },
  });
}

export function useUpdateRisk(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipRiskRegistry, 'id' | 'createdAt'>> }) =>
      service.updateRisk(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'risks', schoolId] });
    },
  });
}

export function useDeleteRisk(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteRisk(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'risks', schoolId] });
    },
  });
}

export function useRiskMatrices(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipRiskMatrix[]>({
    queryKey: [QUERY_KEY, 'matrices', schoolId],
    queryFn: () => service.listMatrices(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateRiskMatrix(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createMatrix(schoolId, data as Omit<GeaesipRiskMatrix, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'matrices', schoolId] });
    },
  });
}

export function useEarlyWarnings(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEarlyWarning[]>({
    queryKey: [QUERY_KEY, 'warnings', schoolId],
    queryFn: () => service.listWarnings(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateEarlyWarning(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createWarning(schoolId, data as Omit<GeaesipEarlyWarning, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'warnings', schoolId] });
    },
  });
}

export function useMitigationPlans(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipMitigationPlan[]>({
    queryKey: [QUERY_KEY, 'mitigation-plans', schoolId],
    queryFn: () => service.listMitigationPlans(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateMitigationPlan(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createMitigationPlan(schoolId, data as Omit<GeaesipMitigationPlan, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'mitigation-plans', schoolId] });
    },
  });
}

export function useUpdateMitigationPlan(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipMitigationPlan, 'id' | 'createdAt'>> }) =>
      service.updateMitigationPlan(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'mitigation-plans', schoolId] });
    },
  });
}

export function useRiskResilienceStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getRiskResilienceStats(schoolId),
    enabled: !!schoolId,
  });
}
