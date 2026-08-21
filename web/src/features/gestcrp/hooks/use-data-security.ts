'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { DataSecurityService } from '../services';
import type {
  GestcrpDLPPolicy,
  GestcrpEncryptionKey,
  GestcrpDataRetentionPolicy,
  GestcrpDataMaskingRule,
} from '../repositories/data-security-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-data-security';

function createService(): DataSecurityService {
  return new DataSecurityService();
}

export function useDLPPolicies(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpDLPPolicy>>({
    queryKey: [QUERY_KEY, 'dlp-policies', schoolId, params],
    queryFn: () => service.listDLPPolicies(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCreateDLPPolicy() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createDLPPolicy(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'dlp-policies', variables.schoolId],
      });
    },
  });

  const createDLPPolicy = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createDLPPolicy,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useEncryptionKeys(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpEncryptionKey>>({
    queryKey: [QUERY_KEY, 'encryption-keys', schoolId, params],
    queryFn: () => service.listEncryptionKeys(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useDataRetentionPolicy(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpDataRetentionPolicy>>({
    queryKey: [QUERY_KEY, 'retention-policies', schoolId, params],
    queryFn: () => service.listRetentionPolicies(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useDataMaskingRules(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpDataMaskingRule>>({
    queryKey: [QUERY_KEY, 'masking-rules', schoolId, params],
    queryFn: () => service.listMaskingRules(schoolId, params),
    enabled: !!schoolId,
  });
}
