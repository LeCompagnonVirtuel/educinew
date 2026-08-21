'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipAgentOrchestrationService } from '../services/agent-orchestration.service';
import type {
  GeaesipAgentRegistry,
  GeaesipAgentMission,
  GeaesipAgentVote,
  GeaesipAgentNegotiation,
} from '@educi/types';

const QUERY_KEY = 'geaesip-agent-orchestration';

function createService(): GeaesipAgentOrchestrationService {
  return new GeaesipAgentOrchestrationService();
}

export function useAgentRegistry(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAgentRegistry[]>({
    queryKey: [QUERY_KEY, 'agents', schoolId],
    queryFn: () => service.listAgents(schoolId),
    enabled: !!schoolId,
  });
}

export function useRegisterAgent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.registerAgent(schoolId, data as Omit<GeaesipAgentRegistry, 'id' | 'createdAt' | 'updatedAt' | 'lastActiveAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'agents', schoolId] });
    },
  });
}

export function useUpdateAgent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipAgentRegistry, 'id' | 'createdAt'>> }) =>
      service.updateAgent(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'agents', schoolId] });
    },
  });
}

export function useDeactivateAgent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deactivateAgent(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'agents', schoolId] });
    },
  });
}

export function useDeleteAgent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteAgent(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'agents', schoolId] });
    },
  });
}

export function useAgentMissions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAgentMission[]>({
    queryKey: [QUERY_KEY, 'missions', schoolId],
    queryFn: () => service.listMissions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateMission(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createMission(schoolId, data as Omit<GeaesipAgentMission, 'id' | 'createdAt' | 'completedAt' | 'result' | 'score'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'missions', schoolId] });
    },
  });
}

export function useCompleteMission(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, result, score }: { id: string; result: Record<string, unknown>; score: number }) =>
      service.completeMission(schoolId, id, result, score),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'missions', schoolId] });
    },
  });
}

export function useAgentVotes(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAgentVote[]>({
    queryKey: [QUERY_KEY, 'votes', schoolId],
    queryFn: () => service.listVotes(schoolId),
    enabled: !!schoolId,
  });
}

export function useCastVote(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.castVote(schoolId, data as Omit<GeaesipAgentVote, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'votes', schoolId] });
    },
  });
}

export function useAgentNegotiations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAgentNegotiation[]>({
    queryKey: [QUERY_KEY, 'negotiations', schoolId],
    queryFn: () => service.listNegotiations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateNegotiation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createNegotiation(schoolId, data as Omit<GeaesipAgentNegotiation, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'negotiations', schoolId] });
    },
  });
}

export function useAgentOrchestrationStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getAgentOrchestrationStats(schoolId),
    enabled: !!schoolId,
  });
}
