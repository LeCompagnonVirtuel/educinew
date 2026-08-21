'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipGovernanceEthicsService } from '../services/governance-ethics.service';
import type {
  GeaesipGovernancePolicy,
  GeaesipGovernanceAudit,
  GeaesipEthicsReview,
  GeaesipBiasReview,
} from '@educi/types';

const QUERY_KEY = 'geaesip-governance-ethics';

function createService(): GeaesipGovernanceEthicsService {
  return new GeaesipGovernanceEthicsService();
}

export function useGovernancePolicies(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipGovernancePolicy[]>({
    queryKey: [QUERY_KEY, 'policies', schoolId],
    queryFn: () => service.listPolicies(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateGovernancePolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createPolicy(schoolId, data as Omit<GeaesipGovernancePolicy, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'policies', schoolId] });
    },
  });
}

export function useUpdateGovernancePolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipGovernancePolicy, 'id' | 'createdAt'>> }) =>
      service.updatePolicy(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'policies', schoolId] });
    },
  });
}

export function useDeleteGovernancePolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deletePolicy(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'policies', schoolId] });
    },
  });
}

export function useGovernanceAudits(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipGovernanceAudit[]>({
    queryKey: [QUERY_KEY, 'audits', schoolId],
    queryFn: () => service.listAudits(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateGovernanceAudit(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAudit(schoolId, data as Omit<GeaesipGovernanceAudit, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'audits', schoolId] });
    },
  });
}

export function useEthicsReviews(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEthicsReview[]>({
    queryKey: [QUERY_KEY, 'ethics-reviews', schoolId],
    queryFn: () => service.listEthicsReviews(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateEthicsReview(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createEthicsReview(schoolId, data as Omit<GeaesipEthicsReview, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'ethics-reviews', schoolId] });
    },
  });
}

export function useUpdateEthicsReview(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipEthicsReview, 'id' | 'timestamp'>> }) =>
      service.updateEthicsReview(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'ethics-reviews', schoolId] });
    },
  });
}

export function useBiasReviews(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipBiasReview[]>({
    queryKey: [QUERY_KEY, 'bias-reviews', schoolId],
    queryFn: () => service.listBiasReviews(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateBiasReview(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createBiasReview(schoolId, data as Omit<GeaesipBiasReview, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'bias-reviews', schoolId] });
    },
  });
}

export function useUpdateBiasReview(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipBiasReview, 'id' | 'timestamp'>> }) =>
      service.updateBiasReview(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'bias-reviews', schoolId] });
    },
  });
}

export function useGovernanceEthicsStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getGovernanceEthicsStats(schoolId),
    enabled: !!schoolId,
  });
}
