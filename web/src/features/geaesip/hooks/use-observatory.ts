'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipObservatoryService } from '../services/observatory.service';
import type {
  GeaesipCompositeIndex,
  GeaesipObservatoryIndicator2,
  GeaesipObservatoryTrend,
} from '@educi/types';

const QUERY_KEY = 'geaesip-observatory';

function createService(): GeaesipObservatoryService {
  return new GeaesipObservatoryService();
}

export function useCompositeIndices(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipCompositeIndex[]>({
    queryKey: [QUERY_KEY, 'indices', schoolId],
    queryFn: () => service.listIndices(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCompositeIndex(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createIndex(schoolId, data as Omit<GeaesipCompositeIndex, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'indices', schoolId] });
    },
  });
}

export function useUpdateCompositeIndex(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipCompositeIndex, 'id' | 'computedAt'>> }) =>
      service.updateIndex(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'indices', schoolId] });
    },
  });
}

export function useDeleteCompositeIndex(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteIndex(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'indices', schoolId] });
    },
  });
}

export function useObservatoryIndicators(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipObservatoryIndicator2[]>({
    queryKey: [QUERY_KEY, 'indicators', schoolId],
    queryFn: () => service.listIndicators(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateObservatoryIndicator(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createIndicator(schoolId, data as Omit<GeaesipObservatoryIndicator2, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'indicators', schoolId] });
    },
  });
}

export function useUpdateObservatoryIndicator(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipObservatoryIndicator2, 'id' | 'computedAt'>> }) =>
      service.updateIndicator(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'indicators', schoolId] });
    },
  });
}

export function useObservatoryTrends(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipObservatoryTrend[]>({
    queryKey: [QUERY_KEY, 'trends', schoolId],
    queryFn: () => service.listTrends(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateObservatoryTrend(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createTrend(schoolId, data as Omit<GeaesipObservatoryTrend, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'trends', schoolId] });
    },
  });
}

export function useObservatoryStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getObservatoryStats(schoolId),
    enabled: !!schoolId,
  });
}
