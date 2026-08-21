'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipCrisisCommandService } from '../services/crisis-command.service';
import type {
  GeaesipCrisis,
  GeaesipCrisisTeam,
  GeaesipCrisisPlaybook,
  GeaesipEmergencyCommunication,
} from '@educi/types';

const QUERY_KEY = 'geaesip-crisis-command';

function createService(): GeaesipCrisisCommandService {
  return new GeaesipCrisisCommandService();
}

export function useCrises(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCrisis[]>({
    queryKey: [QUERY_KEY, 'crises', schoolId],
    queryFn: () => service.listCrises(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCrisis(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createCrisis(schoolId, data as Omit<GeaesipCrisis, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'crises', schoolId] });
    },
  });
}

export function useUpdateCrisis(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipCrisis, 'id' | 'createdAt'>> }) =>
      service.updateCrisis(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'crises', schoolId] });
    },
  });
}

export function useDeleteCrisis(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteCrisis(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'crises', schoolId] });
    },
  });
}

export function useCrisisTeams(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCrisisTeam[]>({
    queryKey: [QUERY_KEY, 'teams', schoolId],
    queryFn: () => service.listTeams(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCrisisTeam(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createTeam(schoolId, data as Omit<GeaesipCrisisTeam, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'teams', schoolId] });
    },
  });
}

export function useUpdateCrisisTeam(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipCrisisTeam, 'id' | 'createdAt'>> }) =>
      service.updateTeam(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'teams', schoolId] });
    },
  });
}

export function useDeleteCrisisTeam(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteTeam(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'teams', schoolId] });
    },
  });
}

export function useCrisisPlaybooks(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCrisisPlaybook[]>({
    queryKey: [QUERY_KEY, 'playbooks', schoolId],
    queryFn: () => service.listPlaybooks(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCrisisPlaybook(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createPlaybook(schoolId, data as Omit<GeaesipCrisisPlaybook, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'playbooks', schoolId] });
    },
  });
}

export function useUpdateCrisisPlaybook(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipCrisisPlaybook, 'id' | 'createdAt'>> }) =>
      service.updatePlaybook(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'playbooks', schoolId] });
    },
  });
}

export function useDeleteCrisisPlaybook(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deletePlaybook(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'playbooks', schoolId] });
    },
  });
}

export function useEmergencyCommunications(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEmergencyCommunication[]>({
    queryKey: [QUERY_KEY, 'communications', schoolId],
    queryFn: () => service.listCommunications(schoolId),
    enabled: !!schoolId,
  });
}

export function useSendEmergencyCommunication(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.sendCommunication(schoolId, data as Omit<GeaesipEmergencyCommunication, 'id' | 'sentAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'communications', schoolId] });
    },
  });
}

export function useCrisisCommandStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getCrisisCommandStats(schoolId),
    enabled: !!schoolId,
  });
}
