'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipAIEvaluationService } from '../services/ai-evaluation.service';
import type {
  GeaesipAIEvaluation,
  GeaesipModelEvaluation,
  GeaesipAgentEvaluation,
} from '@educi/types';

const QUERY_KEY = 'geaesip-ai-evaluation';

function createService(): GeaesipAIEvaluationService {
  return new GeaesipAIEvaluationService();
}

export function useAIEvaluations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAIEvaluation[]>({
    queryKey: [QUERY_KEY, 'evaluations', schoolId],
    queryFn: () => service.listEvaluations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateAIEvaluation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createEvaluation(schoolId, data as Omit<GeaesipAIEvaluation, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'evaluations', schoolId] });
    },
  });
}

export function useUpdateAIEvaluation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipAIEvaluation, 'id' | 'createdAt'>> }) =>
      service.updateEvaluation(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'evaluations', schoolId] });
    },
  });
}

export function useDeleteAIEvaluation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteEvaluation(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'evaluations', schoolId] });
    },
  });
}

export function useModelEvaluations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipModelEvaluation[]>({
    queryKey: [QUERY_KEY, 'model-evaluations', schoolId],
    queryFn: () => service.listModelEvaluations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateModelEvaluation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createModelEvaluation(schoolId, data as Omit<GeaesipModelEvaluation, 'id' | 'evaluatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'model-evaluations', schoolId] });
    },
  });
}

export function useAgentEvaluations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAgentEvaluation[]>({
    queryKey: [QUERY_KEY, 'agent-evaluations', schoolId],
    queryFn: () => service.listAgentEvaluations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateAgentEvaluation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAgentEvaluation(schoolId, data as Omit<GeaesipAgentEvaluation, 'id' | 'evaluatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'agent-evaluations', schoolId] });
    },
  });
}

export function useAIEvaluationStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getAIEvaluationStats(schoolId),
    enabled: !!schoolId,
  });
}
