'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipResourceOptimizationService } from '../services/resource-optimization.service';
import type {
  GeaesipResourceForecast,
  GeaesipAllocationPlan,
  GeaesipOptimizationResult,
} from '@educi/types';

const QUERY_KEY = 'geaesip-resource-optimization';

function createService(): GeaesipResourceOptimizationService {
  return new GeaesipResourceOptimizationService();
}

export function useResourceForecasts(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipResourceForecast[]>({
    queryKey: [QUERY_KEY, 'forecasts', schoolId],
    queryFn: () => service.listForecasts(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateResourceForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createForecast(schoolId, data as Omit<GeaesipResourceForecast, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'forecasts', schoolId] });
    },
  });
}

export function useUpdateResourceForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipResourceForecast, 'id' | 'createdAt'>> }) =>
      service.updateForecast(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'forecasts', schoolId] });
    },
  });
}

export function useDeleteResourceForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteForecast(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'forecasts', schoolId] });
    },
  });
}

export function useAllocationPlans(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAllocationPlan[]>({
    queryKey: [QUERY_KEY, 'allocations', schoolId],
    queryFn: () => service.listAllocations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateAllocationPlan(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAllocation(schoolId, data as Omit<GeaesipAllocationPlan, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'allocations', schoolId] });
    },
  });
}

export function useUpdateAllocationPlan(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipAllocationPlan, 'id' | 'createdAt'>> }) =>
      service.updateAllocation(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'allocations', schoolId] });
    },
  });
}

export function useDeleteAllocationPlan(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteAllocation(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'allocations', schoolId] });
    },
  });
}

export function useOptimizationResults(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipOptimizationResult[]>({
    queryKey: [QUERY_KEY, 'optimizations', schoolId],
    queryFn: () => service.listOptimizations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateOptimization(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createOptimization(schoolId, data as Omit<GeaesipOptimizationResult, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'optimizations', schoolId] });
    },
  });
}

export function useResourceOptimizationStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getResourceOptimizationStats(schoolId),
    enabled: !!schoolId,
  });
}
