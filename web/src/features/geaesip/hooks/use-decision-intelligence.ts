'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipDecisionIntelligenceService } from '../services/decision-intelligence.service';
import type {
  GeaesipDecision,
  GeaesipDecisionOption,
  GeaesipDecisionApproval,
  GeaesipDecisionAudit,
} from '@educi/types';

const QUERY_KEY = 'geaesip-decision-intelligence';

function createService(): GeaesipDecisionIntelligenceService {
  return new GeaesipDecisionIntelligenceService();
}

export function useDecisions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipDecision[]>({
    queryKey: [QUERY_KEY, 'decisions', schoolId],
    queryFn: () => service.listDecisions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateDecision(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDecision(schoolId, data as Omit<GeaesipDecision, 'id' | 'createdAt' | 'updatedAt' | 'selectedOption'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'decisions', schoolId] });
    },
  });
}

export function useSelectDecisionOption(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, optionId }: { id: string; optionId: string }) =>
      service.selectOption(schoolId, id, optionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'decisions', schoolId] });
    },
  });
}

export function useUpdateDecision(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipDecision, 'id' | 'createdAt'>> }) =>
      service.updateDecision(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'decisions', schoolId] });
    },
  });
}

export function useDeleteDecision(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteDecision(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'decisions', schoolId] });
    },
  });
}

export function useDecisionOptions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipDecisionOption[]>({
    queryKey: [QUERY_KEY, 'options', schoolId],
    queryFn: () => service.listOptions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateDecisionOption(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createOption(schoolId, data as Omit<GeaesipDecisionOption, 'id'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'options', schoolId] });
    },
  });
}

export function useDecisionApprovals(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipDecisionApproval[]>({
    queryKey: [QUERY_KEY, 'approvals', schoolId],
    queryFn: () => service.listApprovals(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateDecisionApproval(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createApproval(schoolId, data as Omit<GeaesipDecisionApproval, 'id' | 'timestamp'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'approvals', schoolId] });
    },
  });
}

export function useDecisionAudits(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipDecisionAudit[]>({
    queryKey: [QUERY_KEY, 'audits', schoolId],
    queryFn: () => service.listAudits(schoolId),
    enabled: !!schoolId,
  });
}

export function useDecisionIntelligenceStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getDecisionIntelligenceStats(schoolId),
    enabled: !!schoolId,
  });
}
