'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { AppSecurityService } from '../services';
import type {
  GestcrpAppScan,
  GestcrpVulnerability,
  GestcrpAPISecurityPolicy,
} from '../repositories/app-security-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-app-security';

function createService(): AppSecurityService {
  return new AppSecurityService();
}

export function useAppScans(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpAppScan>>({
    queryKey: [QUERY_KEY, 'scans', schoolId, params, filters],
    queryFn: () => service.listScans(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateAppScan() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createScan(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'scans', variables.schoolId],
      });
    },
  });

  const createScan = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createScan,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useAppVulnerabilities(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpVulnerability>>({
    queryKey: [QUERY_KEY, 'vulnerabilities', schoolId, params, filters],
    queryFn: () => service.listVulnerabilities(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useAPISecurityPolicies(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpAPISecurityPolicy>>({
    queryKey: [QUERY_KEY, 'api-policies', schoolId, params],
    queryFn: () => service.listAPISecurityPolicies(schoolId, params),
    enabled: !!schoolId,
  });
}
