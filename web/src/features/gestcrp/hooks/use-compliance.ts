'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { ComplianceService } from '../services';
import type {
  GestcrpComplianceAssessment,
  GestcrpGovernancePolicy,
  GestcrpRiskRegister,
  GestcrpAuditLog,
} from '../repositories/compliance-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-compliance';

function createService(): ComplianceService {
  return new ComplianceService();
}

export function useComplianceAssessments(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpComplianceAssessment>>({
    queryKey: [QUERY_KEY, 'assessments', schoolId, params, filters],
    queryFn: () => service.listAssessments(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateComplianceAssessment() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createAssessment(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'assessments', variables.schoolId],
      });
    },
  });

  const createAssessment = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createAssessment,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useGovernancePolicies(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpGovernancePolicy>>({
    queryKey: [QUERY_KEY, 'governance-policies', schoolId, params],
    queryFn: () => service.listGovernancePolicies(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useRiskRegisters(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpRiskRegister>>({
    queryKey: [QUERY_KEY, 'risk-registers', schoolId, params, filters],
    queryFn: () => service.listRisks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useAuditLogs(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpAuditLog>>({
    queryKey: [QUERY_KEY, 'audit-logs', schoolId, params],
    queryFn: () => service.listAuditLogs(schoolId, params),
    enabled: !!schoolId,
  });
}
