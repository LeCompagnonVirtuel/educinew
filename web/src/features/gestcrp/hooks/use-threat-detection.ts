'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { ThreatDetectionService } from '../services';
import type { GestcrpThreatIndicator, GestcrpThreatFeed, GestcrpThreatAnalysis } from '../repositories/threat-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-threat';

function createService(): ThreatDetectionService {
  return new ThreatDetectionService();
}

export function useThreatIndicators(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpThreatIndicator>>({
    queryKey: [QUERY_KEY, 'indicators', schoolId, params, filters],
    queryFn: () => service.listIndicators(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateThreatIndicator() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.createIndicator(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'indicators', variables.schoolId],
      });
    },
  });

  const createIndicator = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createIndicator,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useThreatFeeds(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpThreatFeed>>({
    queryKey: [QUERY_KEY, 'feeds', schoolId, params],
    queryFn: () => service.listFeeds(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useThreatAnalysis(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpThreatAnalysis>>({
    queryKey: [QUERY_KEY, 'analyses', schoolId, params],
    queryFn: () => service.listAnalyses(schoolId, params),
    enabled: !!schoolId,
  });
}
