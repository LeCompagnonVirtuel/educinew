'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipCrossDomainService } from '../services/cross-domain.service';
import type {
  GeaesipCrossDomainEvent,
  GeaesipCorrelation,
  GeaesipImpactChain,
  GeaesipSystemicRisk,
  GeaesipDependencyGraph,
} from '@educi/types';

const QUERY_KEY = 'geaesip-cross-domain';

function createService(): GeaesipCrossDomainService {
  return new GeaesipCrossDomainService();
}

export function useCrossDomainEvents(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCrossDomainEvent[]>({
    queryKey: [QUERY_KEY, 'events', schoolId],
    queryFn: () => service.listEvents(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCrossDomainEvent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createEvent(schoolId, data as Omit<GeaesipCrossDomainEvent, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'events', schoolId] });
    },
  });
}

export function useUpdateCrossDomainEvent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipCrossDomainEvent, 'id' | 'timestamp'>> }) =>
      service.updateEvent(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'events', schoolId] });
    },
  });
}

export function useDeleteCrossDomainEvent(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteEvent(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'events', schoolId] });
    },
  });
}

export function useCorrelations(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCorrelation[]>({
    queryKey: [QUERY_KEY, 'correlations', schoolId],
    queryFn: () => service.listCorrelations(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCorrelation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createCorrelation(schoolId, data as Omit<GeaesipCorrelation, 'id' | 'discoveredAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'correlations', schoolId] });
    },
  });
}

export function useImpactChains(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipImpactChain[]>({
    queryKey: [QUERY_KEY, 'impact-chains', schoolId],
    queryFn: () => service.listImpactChains(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateImpactChain(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createImpactChain(schoolId, data as Omit<GeaesipImpactChain, 'id' | 'detectedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'impact-chains', schoolId] });
    },
  });
}

export function useSystemicRisks(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipSystemicRisk[]>({
    queryKey: [QUERY_KEY, 'systemic-risks', schoolId],
    queryFn: () => service.listSystemicRisks(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateSystemicRisk(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createSystemicRisk(schoolId, data as Omit<GeaesipSystemicRisk, 'id' | 'lastAssessedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'systemic-risks', schoolId] });
    },
  });
}

export function useDependencyGraphs(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipDependencyGraph[]>({
    queryKey: [QUERY_KEY, 'dependency-graphs', schoolId],
    queryFn: () => service.listDependencyGraphs(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateDependencyGraph(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDependencyGraph(schoolId, data as Omit<GeaesipDependencyGraph, 'id' | 'lastComputedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'dependency-graphs', schoolId] });
    },
  });
}

export function useCrossDomainStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getCrossDomainStats(schoolId),
    enabled: !!schoolId,
  });
}
