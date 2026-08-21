'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { AIOpsService } from '../services';
import { RootCauseService } from '../services';
import type {
  GecirapAIOpsAgent,
  GecirapInfrastructureEvent,
  GecirapIncidentCorrelation,
  GecirapRecommendation,
} from '../repositories/aiops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const AIOPS_QUERY_KEY = 'gecirap-aiops';
const RCA_QUERY_KEY = 'gecirap-rca';

function createAIOpsService(): AIOpsService {
  return new AIOpsService();
}

function createRootCauseService(): RootCauseService {
  return new RootCauseService();
}

export function useAIOpsAgents(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createAIOpsService(), []);

  return useQuery<PaginatedResult<GecirapAIOpsAgent>>({
    queryKey: [AIOPS_QUERY_KEY, 'agents', schoolId, params, filters],
    queryFn: () => service.listAgents(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useInfrastructureEvents(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createAIOpsService(), []);

  return useQuery<PaginatedResult<GecirapInfrastructureEvent>>({
    queryKey: [AIOPS_QUERY_KEY, 'events', schoolId, params, filters],
    queryFn: () => service.listEvents(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useIncidentCorrelations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createAIOpsService(), []);

  return useQuery<PaginatedResult<GecirapIncidentCorrelation>>({
    queryKey: [AIOPS_QUERY_KEY, 'correlations', schoolId, params, filters],
    queryFn: () => service.listCorrelations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useRecommendations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createRootCauseService(), []);

  return useQuery<PaginatedResult<GecirapRecommendation>>({
    queryKey: [RCA_QUERY_KEY, 'recommendations', schoolId, params, filters],
    queryFn: () => service.listRecommendations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
