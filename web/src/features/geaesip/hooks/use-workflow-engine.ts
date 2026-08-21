'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipWorkflowEngineService } from '../services/workflow-engine.service';
import type {
  GeaesipWorkflow,
  GeaesipWorkflowTask,
  GeaesipActionPlan,
  GeaesipExecutionLog,
} from '@educi/types';

const QUERY_KEY = 'geaesip-workflow-engine';

function createService(): GeaesipWorkflowEngineService {
  return new GeaesipWorkflowEngineService();
}

export function useWorkflows(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipWorkflow[]>({
    queryKey: [QUERY_KEY, 'workflows', schoolId],
    queryFn: () => service.listWorkflows(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateWorkflow(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createWorkflow(schoolId, data as Omit<GeaesipWorkflow, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'workflows', schoolId] });
    },
  });
}

export function useUpdateWorkflow(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipWorkflow, 'id' | 'createdAt'>> }) =>
      service.updateWorkflow(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'workflows', schoolId] });
    },
  });
}

export function useDeleteWorkflow(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteWorkflow(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'workflows', schoolId] });
    },
  });
}

export function useWorkflowTasks(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipWorkflowTask[]>({
    queryKey: [QUERY_KEY, 'tasks', schoolId],
    queryFn: () => service.listTasks(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateWorkflowTask(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createTask(schoolId, data as Omit<GeaesipWorkflowTask, 'id' | 'createdAt' | 'completedAt' | 'result' | 'retries'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'tasks', schoolId] });
    },
  });
}

export function useCompleteWorkflowTask(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, result }: { id: string; result: Record<string, unknown> }) =>
      service.completeTask(schoolId, id, result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'tasks', schoolId] });
    },
  });
}

export function useRetryWorkflowTask(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.retryTask(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'tasks', schoolId] });
    },
  });
}

export function useActionPlans(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipActionPlan[]>({
    queryKey: [QUERY_KEY, 'action-plans', schoolId],
    queryFn: () => service.listActionPlans(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateActionPlan(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createActionPlan(schoolId, data as Omit<GeaesipActionPlan, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'action-plans', schoolId] });
    },
  });
}

export function useExecutionLogs(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipExecutionLog[]>({
    queryKey: [QUERY_KEY, 'execution-logs', schoolId],
    queryFn: () => service.listExecutionLogs(schoolId),
    enabled: !!schoolId,
  });
}

export function useWorkflowEngineStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getWorkflowEngineStats(schoolId),
    enabled: !!schoolId,
  });
}
