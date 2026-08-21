'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipDigitalTwinService } from '../services/digital-twin.service';
import type {
  GeaesipSystemTwin,
  GeaesipTwinState,
  GeaesipTwinSimulation,
} from '@educi/types';

const QUERY_KEY = 'geaesip-digital-twin';

function createService(): GeaesipDigitalTwinService {
  return new GeaesipDigitalTwinService();
}

export function useSystemTwins(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipSystemTwin[]>({
    queryKey: [QUERY_KEY, 'twins', schoolId],
    queryFn: () => service.listTwins(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateTwin(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createTwin(schoolId, data as Omit<GeaesipSystemTwin, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'twins', schoolId] });
    },
  });
}

export function useUpdateTwin(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipSystemTwin, 'id' | 'createdAt'>> }) =>
      service.updateTwin(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'twins', schoolId] });
    },
  });
}

export function useDeleteTwin(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteTwin(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'twins', schoolId] });
    },
  });
}

export function useTwinStates(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipTwinState[]>({
    queryKey: [QUERY_KEY, 'states', schoolId],
    queryFn: () => service.listStates(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateTwinState(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createState(schoolId, data as Omit<GeaesipTwinState, 'id' | 'lastUpdated'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'states', schoolId] });
    },
  });
}

export function useTwinSimulations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipTwinSimulation[]>({
    queryKey: [QUERY_KEY, 'simulations', schoolId],
    queryFn: () => service.listSimulations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateTwinSimulation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createSimulation(schoolId, data as Omit<GeaesipTwinSimulation, 'id' | 'createdAt' | 'completedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'simulations', schoolId] });
    },
  });
}

export function useDeleteTwinSimulation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteSimulation(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'simulations', schoolId] });
    },
  });
}

export function useDigitalTwinStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getDigitalTwinStats(schoolId),
    enabled: !!schoolId,
  });
}
