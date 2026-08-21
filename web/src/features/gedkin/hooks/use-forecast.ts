'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ForecastService } from '../services';
import { ForecastModelService } from '../services';
import { CapacityForecastService } from '../services';
import type {
  GedkinForecast,
  GedkinForecastModel_,
  GedkinCapacityForecast,
  GedkinDriftDetection,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const FORECAST_QUERY_KEY = 'gedkin-forecast';

function createForecastService(): ForecastService {
  return new ForecastService();
}

function createModelService(): ForecastModelService {
  return new ForecastModelService();
}

function createCapacityService(): CapacityForecastService {
  return new CapacityForecastService();
}

export function useForecasts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createForecastService(), []);

  return useQuery<PaginatedResult<GedkinForecast>>({
    queryKey: [FORECAST_QUERY_KEY, 'forecasts', schoolId, params, filters],
    queryFn: () => service.listForecasts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createForecastService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createForecast(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FORECAST_QUERY_KEY, 'forecasts', schoolId],
      });
    },
  });
}

export function useForecastModels(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createModelService(), []);

  return useQuery<PaginatedResult<GedkinForecastModel_>>({
    queryKey: [FORECAST_QUERY_KEY, 'models', schoolId, params, filters],
    queryFn: () => service.listModels(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCapacityForecasts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createCapacityService(), []);

  return useQuery<PaginatedResult<GedkinCapacityForecast>>({
    queryKey: [FORECAST_QUERY_KEY, 'capacity', schoolId, params, filters],
    queryFn: () => service.listCapacityForecasts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useDriftDetections(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createCapacityService(), []);

  return useQuery<PaginatedResult<GedkinDriftDetection>>({
    queryKey: [FORECAST_QUERY_KEY, 'drift', schoolId, params, filters],
    queryFn: () => service.listDriftDetections(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
