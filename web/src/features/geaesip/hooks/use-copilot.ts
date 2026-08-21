'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipCopilotService } from '../services/copilot.service';
import type {
  GeaesipCopilotSession,
  GeaesipCopilotAnswer,
  GeaesipCopilotExplanation,
} from '@educi/types';

const QUERY_KEY = 'geaesip-copilot';

function createService(): GeaesipCopilotService {
  return new GeaesipCopilotService();
}

export function useCopilotSessions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCopilotSession[]>({
    queryKey: [QUERY_KEY, 'sessions', schoolId],
    queryFn: () => service.listSessions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCopilotSession(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createSession(schoolId, data as Omit<GeaesipCopilotSession, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'sessions', schoolId] });
    },
  });
}

export function useUpdateCopilotSession(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipCopilotSession, 'id' | 'createdAt'>> }) =>
      service.updateSession(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'sessions', schoolId] });
    },
  });
}

export function useDeleteCopilotSession(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteSession(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'sessions', schoolId] });
    },
  });
}

export function useCopilotAnswers(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCopilotAnswer[]>({
    queryKey: [QUERY_KEY, 'answers', schoolId],
    queryFn: () => service.listAnswers(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCopilotAnswer(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAnswer(schoolId, data as Omit<GeaesipCopilotAnswer, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'answers', schoolId] });
    },
  });
}

export function useCopilotExplanations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCopilotExplanation[]>({
    queryKey: [QUERY_KEY, 'explanations', schoolId],
    queryFn: () => service.listExplanations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCopilotExplanation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createExplanation(schoolId, data as Omit<GeaesipCopilotExplanation, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'explanations', schoolId] });
    },
  });
}

export function useCopilotStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getCopilotStats(schoolId),
    enabled: !!schoolId,
  });
}
