'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipMemoryFabricService } from '../services/memory-fabric.service';
import type {
  GeaesipMemory,
  GeaesipMemoryRetrieval,
  GeaesipMemoryPolicy,
} from '@educi/types';

const QUERY_KEY = 'geaesip-memory-fabric';

function createService(): GeaesipMemoryFabricService {
  return new GeaesipMemoryFabricService();
}

export function useMemories(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipMemory[]>({
    queryKey: [QUERY_KEY, 'memories', schoolId],
    queryFn: () => service.listMemories(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateMemory(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createMemory(schoolId, data as Omit<GeaesipMemory, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'memories', schoolId] });
    },
  });
}

export function useUpdateMemory(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipMemory, 'id' | 'createdAt'>> }) =>
      service.updateMemory(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'memories', schoolId] });
    },
  });
}

export function useDeleteMemory(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteMemory(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'memories', schoolId] });
    },
  });
}

export function useMemoryRetrievals(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipMemoryRetrieval[]>({
    queryKey: [QUERY_KEY, 'retrievals', schoolId],
    queryFn: () => service.listRetrievals(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateMemoryRetrieval(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createRetrieval(schoolId, data as Omit<GeaesipMemoryRetrieval, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'retrievals', schoolId] });
    },
  });
}

export function useMemoryPolicies(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipMemoryPolicy[]>({
    queryKey: [QUERY_KEY, 'policies', schoolId],
    queryFn: () => service.listPolicies(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateMemoryPolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createPolicy(schoolId, data as Omit<GeaesipMemoryPolicy, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'policies', schoolId] });
    },
  });
}

export function useUpdateMemoryPolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipMemoryPolicy, 'id' | 'createdAt'>> }) =>
      service.updatePolicy(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'policies', schoolId] });
    },
  });
}

export function useDeleteMemoryPolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deletePolicy(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'policies', schoolId] });
    },
  });
}

export function useMemoryFabricStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getMemoryFabricStats(schoolId),
    enabled: !!schoolId,
  });
}
