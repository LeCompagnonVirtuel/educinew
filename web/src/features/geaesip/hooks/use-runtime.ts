'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipRuntimeService } from '../services/runtime.service';
import type {
  GeaesipEducationRuntime,
  GeaesipRuntimeExecution,
  GeaesipRuntimeMetric,
} from '@educi/types';

const QUERY_KEY = 'geaesip-runtime';

function createService(): GeaesipRuntimeService {
  return new GeaesipRuntimeService();
}

export function useRuntimes(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEducationRuntime[]>({
    queryKey: [QUERY_KEY, 'runtimes', schoolId],
    queryFn: () => service.listRuntimes(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateRuntime(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createRuntime(schoolId, data as Omit<GeaesipEducationRuntime, 'id' | 'createdAt' | 'updatedAt' | 'lastRunAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runtimes', schoolId] });
    },
  });
}

export function useUpdateRuntime(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipEducationRuntime, 'id' | 'createdAt'>> }) =>
      service.updateRuntime(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runtimes', schoolId] });
    },
  });
}

export function useStartRuntime(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.startRuntime(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runtimes', schoolId] });
    },
  });
}

export function useStopRuntime(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.stopRuntime(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runtimes', schoolId] });
    },
  });
}

export function useDeleteRuntime(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteRuntime(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'runtimes', schoolId] });
    },
  });
}

export function useRuntimeExecutions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipRuntimeExecution[]>({
    queryKey: [QUERY_KEY, 'executions', schoolId],
    queryFn: () => service.listExecutions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateRuntimeExecution(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createExecution(schoolId, data as Omit<GeaesipRuntimeExecution, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'executions', schoolId] });
    },
  });
}

export function useRuntimeMetrics(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipRuntimeMetric[]>({
    queryKey: [QUERY_KEY, 'metrics', schoolId],
    queryFn: () => service.listMetrics(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateRuntimeMetric(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createMetric(schoolId, data as Omit<GeaesipRuntimeMetric, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'metrics', schoolId] });
    },
  });
}

export function useRuntimeStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getRuntimeStats(schoolId),
    enabled: !!schoolId,
  });
}
