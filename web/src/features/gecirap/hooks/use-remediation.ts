'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { RemediationService } from '../services';
import { RootCauseService } from '../services';
import type {
  GecirapRemediationPlan,
  GecirapAutomatedAction,
  GecirapRootCauseAnalysis,
} from '../repositories/aiops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const REMEDIATION_QUERY_KEY = 'gecirap-remediation';
const RCA_QUERY_KEY = 'gecirap-rca';

function createRemediationService(): RemediationService {
  return new RemediationService();
}

function createRootCauseService(): RootCauseService {
  return new RootCauseService();
}

export function useRemediationPlans(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createRemediationService(), []);

  return useQuery<PaginatedResult<GecirapRemediationPlan>>({
    queryKey: [REMEDIATION_QUERY_KEY, 'plans', schoolId, params, filters],
    queryFn: () => service.listPlans(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useAutomatedActions(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createRemediationService(), []);

  return useQuery<PaginatedResult<GecirapAutomatedAction>>({
    queryKey: [REMEDIATION_QUERY_KEY, 'actions', schoolId, params, filters],
    queryFn: () => service.listActions(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useRootCauseAnalyses(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createRootCauseService(), []);

  return useQuery<PaginatedResult<GecirapRootCauseAnalysis>>({
    queryKey: [RCA_QUERY_KEY, 'analyses', schoolId, params, filters],
    queryFn: () => service.listAnalyses(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
