'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipIntelligenceCoreService } from '../services/intelligence-core.service';
import type {
  GeaesipIntelligenceCore,
  GeaesipKnowledgeFusion,
  GeaesipCrossDomainSignal,
  GeaesipCausalRelationship,
  GeaesipSystemHealthScore,
} from '@educi/types';

const QUERY_KEY = 'geaesip-intelligence-core';

function createService(): GeaesipIntelligenceCoreService {
  return new GeaesipIntelligenceCoreService();
}

export function useIntelligences(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipIntelligenceCore[]>({
    queryKey: [QUERY_KEY, 'intelligences', schoolId],
    queryFn: () => service.listIntelligences(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateIntelligence(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createIntelligence(schoolId, data as Omit<GeaesipIntelligenceCore, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'intelligences', schoolId] });
    },
  });
}

export function useUpdateIntelligence(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipIntelligenceCore, 'id' | 'createdAt'>> }) =>
      service.updateIntelligence(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'intelligences', schoolId] });
    },
  });
}

export function useDeleteIntelligence(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteIntelligence(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'intelligences', schoolId] });
    },
  });
}

export function useKnowledgeFusions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipKnowledgeFusion[]>({
    queryKey: [QUERY_KEY, 'fusions', schoolId],
    queryFn: () => service.listFusions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateFusion(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createFusion(schoolId, data as Omit<GeaesipKnowledgeFusion, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'fusions', schoolId] });
    },
  });
}

export function useCrossDomainSignals(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCrossDomainSignal[]>({
    queryKey: [QUERY_KEY, 'signals', schoolId],
    queryFn: () => service.listSignals(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateSignal(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createSignal(schoolId, data as Omit<GeaesipCrossDomainSignal, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'signals', schoolId] });
    },
  });
}

export function useCausalRelationships(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCausalRelationship[]>({
    queryKey: [QUERY_KEY, 'causal-relationships', schoolId],
    queryFn: () => service.listCausalRelationships(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCausalRelationship(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createCausalRelationship(schoolId, data as Omit<GeaesipCausalRelationship, 'id' | 'discoveredAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'causal-relationships', schoolId] });
    },
  });
}

export function useSystemHealthScores(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipSystemHealthScore[]>({
    queryKey: [QUERY_KEY, 'health-scores', schoolId],
    queryFn: () => service.listHealthScores(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateHealthScore(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createHealthScore(schoolId, data as Omit<GeaesipSystemHealthScore, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'health-scores', schoolId] });
    },
  });
}

export function useIntelligenceCoreStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getIntelligenceCoreStats(schoolId),
    enabled: !!schoolId,
  });
}
