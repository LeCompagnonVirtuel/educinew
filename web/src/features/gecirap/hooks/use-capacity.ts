'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { CapacityService } from '../services';
import type {
  GecirapCapacityForecast,
  GecirapCapacityPlan,
  GecirapResourceUtilization,
  GecirapCapacityAlert,
} from '../repositories/autoscaling-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-capacity';

function createService(): CapacityService {
  return new CapacityService();
}

export function useCapacityForecasts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCapacityForecast>>({
    queryKey: [QUERY_KEY, 'forecasts', schoolId, params, filters],
    queryFn: () => service.listForecasts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCapacityPlans(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCapacityPlan>>({
    queryKey: [QUERY_KEY, 'plans', schoolId, params, filters],
    queryFn: () => service.listPlans(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useResourceUtilization(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapResourceUtilization>>({
    queryKey: [QUERY_KEY, 'utilization', schoolId, params],
    queryFn: () => service.listUtilizations(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCapacityAlerts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCapacityAlert>>({
    queryKey: [QUERY_KEY, 'alerts', schoolId, params, filters],
    queryFn: () => service.listAlerts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
