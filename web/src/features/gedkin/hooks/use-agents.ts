'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AgentService } from '../services';
import { AgentTaskService } from '../services';
import type {
  GedkinAIAgent,
  GedkinAgentTask,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const AGENT_QUERY_KEY = 'gedkin-agents';

function createAgentService(): AgentService {
  return new AgentService();
}

function createTaskService(): AgentTaskService {
  return new AgentTaskService();
}

export function useAIAgents(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createAgentService(), []);

  return useQuery<PaginatedResult<GedkinAIAgent>>({
    queryKey: [AGENT_QUERY_KEY, 'agents', schoolId, params, filters],
    queryFn: () => service.listAgents(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateAgent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createAgentService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAgent(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AGENT_QUERY_KEY, 'agents', schoolId],
      });
    },
  });
}

export function useAgentTasks(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createTaskService(), []);

  return useQuery<PaginatedResult<GedkinAgentTask>>({
    queryKey: [AGENT_QUERY_KEY, 'tasks', schoolId, params, filters],
    queryFn: () => service.listTasks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateTask(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createTaskService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createTask(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AGENT_QUERY_KEY, 'tasks', schoolId],
      });
    },
  });
}
