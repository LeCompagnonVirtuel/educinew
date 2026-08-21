'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipApiEventFabricService } from '../services/api-event-fabric.service';
import type {
  GeaesipIntelligenceAPI,
  GeaesipEventBus,
  GeaesipEventSubscription,
  GeaesipAPIUsage,
} from '@educi/types';

const QUERY_KEY = 'geaesip-api-event-fabric';

function createService(): GeaesipApiEventFabricService {
  return new GeaesipApiEventFabricService();
}

export function useIntelligenceAPIs(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipIntelligenceAPI[]>({
    queryKey: [QUERY_KEY, 'apis', schoolId],
    queryFn: () => service.listAPIs(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateIntelligenceAPI(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAPI(schoolId, data as Omit<GeaesipIntelligenceAPI, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'apis', schoolId] });
    },
  });
}

export function useUpdateIntelligenceAPI(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipIntelligenceAPI, 'id' | 'createdAt'>> }) =>
      service.updateAPI(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'apis', schoolId] });
    },
  });
}

export function useDeleteIntelligenceAPI(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteAPI(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'apis', schoolId] });
    },
  });
}

export function useEventBuses(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEventBus[]>({
    queryKey: [QUERY_KEY, 'event-buses', schoolId],
    queryFn: () => service.listEventBuses(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateEventBus(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createEventBus(schoolId, data as Omit<GeaesipEventBus, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'event-buses', schoolId] });
    },
  });
}

export function useUpdateEventBus(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipEventBus, 'id' | 'createdAt'>> }) =>
      service.updateEventBus(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'event-buses', schoolId] });
    },
  });
}

export function useDeleteEventBus(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteEventBus(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'event-buses', schoolId] });
    },
  });
}

export function useEventSubscriptions(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipEventSubscription[]>({
    queryKey: [QUERY_KEY, 'subscriptions', schoolId],
    queryFn: () => service.listSubscriptions(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateEventSubscription(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createSubscription(schoolId, data as Omit<GeaesipEventSubscription, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'subscriptions', schoolId] });
    },
  });
}

export function useUpdateEventSubscription(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipEventSubscription, 'id' | 'createdAt'>> }) =>
      service.updateSubscription(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'subscriptions', schoolId] });
    },
  });
}

export function useDeleteEventSubscription(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteSubscription(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'subscriptions', schoolId] });
    },
  });
}

export function useAPIUsages(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAPIUsage[]>({
    queryKey: [QUERY_KEY, 'usages', schoolId],
    queryFn: () => service.listUsages(schoolId),
    enabled: !!schoolId,
  });
}

export function useApiEventFabricStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getApiEventFabricStats(schoolId),
    enabled: !!schoolId,
  });
}
