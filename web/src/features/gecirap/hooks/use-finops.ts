'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CloudCostService } from '../services';
import { FinOpsService } from '../services';
import { CostOptimizationService } from '../services';
import type {
  GecirapCloudCost,
  GecirapCostForecast,
  GecirapCostAnomaly,
  GecirapCostCenter,
  GecirapBudget,
  GecirapOptimizationRecommendation,
} from '../repositories/finops-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const COST_QUERY_KEY = 'gecirap-cloud-cost';
const FINOPS_QUERY_KEY = 'gecirap-finops';
const OPTIMIZATION_QUERY_KEY = 'gecirap-cost-optimization';

function createCloudCostService(): CloudCostService {
  return new CloudCostService();
}

function createFinOpsService(): FinOpsService {
  return new FinOpsService();
}

function createCostOptimizationService(): CostOptimizationService {
  return new CostOptimizationService();
}

export function useCloudCosts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createCloudCostService(), []);

  return useQuery<PaginatedResult<GecirapCloudCost>>({
    queryKey: [COST_QUERY_KEY, 'costs', schoolId, params, filters],
    queryFn: () => service.listCosts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCostCenters(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createFinOpsService(), []);

  return useQuery<PaginatedResult<GecirapCostCenter>>({
    queryKey: [FINOPS_QUERY_KEY, 'cost-centers', schoolId, params, filters],
    queryFn: () => service.listCostCenters(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useBudgets(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createFinOpsService(), []);

  return useQuery<PaginatedResult<GecirapBudget>>({
    queryKey: [FINOPS_QUERY_KEY, 'budgets', schoolId, params, filters],
    queryFn: () => service.listBudgets(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCostForecasts(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createCloudCostService(), []);

  return useQuery<PaginatedResult<GecirapCostForecast>>({
    queryKey: [COST_QUERY_KEY, 'forecasts', schoolId, params],
    queryFn: () => service.listForecasts(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useCostAnomalies(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createCloudCostService(), []);

  return useQuery<PaginatedResult<GecirapCostAnomaly>>({
    queryKey: [COST_QUERY_KEY, 'anomalies', schoolId, params, filters],
    queryFn: () => service.listAnomalies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useOptimizationRecommendations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createCostOptimizationService(), []);

  return useQuery<PaginatedResult<GecirapOptimizationRecommendation>>({
    queryKey: [OPTIMIZATION_QUERY_KEY, 'recommendations', schoolId, params, filters],
    queryFn: () => service.listRecommendations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
