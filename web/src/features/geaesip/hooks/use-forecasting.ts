'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipForecastingService } from '../services/forecasting.service';
import type {
  GeaesipExtendedForecast,
  GeaesipForecastBacktest,
  GeaesipModelDrift,
} from '@educi/types';

const QUERY_KEY = 'geaesip-forecasting';

function createService(): GeaesipForecastingService {
  return new GeaesipForecastingService();
}

export function useExtendedForecasts(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipExtendedForecast[]>({
    queryKey: [QUERY_KEY, 'forecasts', schoolId],
    queryFn: () => service.listForecasts(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateExtendedForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createForecast(schoolId, data as Omit<GeaesipExtendedForecast, 'id' | 'createdAt' | 'completedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'forecasts', schoolId] });
    },
  });
}

export function useUpdateExtendedForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipExtendedForecast, 'id' | 'createdAt'>> }) =>
      service.updateForecast(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'forecasts', schoolId] });
    },
  });
}

export function useDeleteExtendedForecast(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteForecast(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'forecasts', schoolId] });
    },
  });
}

export function useForecastBacktests(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipForecastBacktest[]>({
    queryKey: [QUERY_KEY, 'backtests', schoolId],
    queryFn: () => service.listBacktests(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateForecastBacktest(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createBacktest(schoolId, data as Omit<GeaesipForecastBacktest, 'id' | 'evaluatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'backtests', schoolId] });
    },
  });
}

export function useModelDrifts(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipModelDrift[]>({
    queryKey: [QUERY_KEY, 'drifts', schoolId],
    queryFn: () => service.listDrifts(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateModelDrift(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDrift(schoolId, data as Omit<GeaesipModelDrift, 'id' | 'detectedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'drifts', schoolId] });
    },
  });
}

export function useForecastingStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getForecastingStats(schoolId),
    enabled: !!schoolId,
  });
}
