'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { DecisionService } from '../services';
import type {
  GedkinDecisionRecommendation,
  GedkinImpactAnalysis,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const DECISION_QUERY_KEY = 'gedkin-decision';

function createService(): DecisionService {
  return new DecisionService();
}

export function useDecisionRecommendations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDecisionRecommendation>>({
    queryKey: [DECISION_QUERY_KEY, 'recommendations', schoolId, params, filters],
    queryFn: () => service.listRecommendations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateRecommendation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createRecommendation(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DECISION_QUERY_KEY, 'recommendations', schoolId],
      });
    },
  });
}

export function useImpactAnalyses(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinImpactAnalysis>>({
    queryKey: [DECISION_QUERY_KEY, 'impact-analyses', schoolId, params, filters],
    queryFn: () => service.listImpactAnalyses(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
