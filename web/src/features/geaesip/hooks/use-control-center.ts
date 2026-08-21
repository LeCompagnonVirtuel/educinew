'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { GeaesipControlCenterService } from '../services/control-center.service';
import type {
  GeaesipControlCenter,
  GeaesipExecutiveCockpit,
  GeaesipAlert,
  GeaesipDecisionQueue,
} from '@educi/types';

const QUERY_KEY = 'geaesip-control-center';

function createService(): GeaesipControlCenterService {
  return new GeaesipControlCenterService();
}

export function useControlCenters(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipControlCenter[]>({
    queryKey: [QUERY_KEY, 'centers', schoolId],
    queryFn: () => service.listCenters(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCenter(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createCenter(schoolId, data as Omit<GeaesipControlCenter, 'id' | 'createdAt' | 'updatedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'centers', schoolId] });
    },
  });
}

export function useUpdateCenter(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<GeaesipControlCenter, 'id' | 'createdAt'>> }) =>
      service.updateCenter(schoolId, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'centers', schoolId] });
    },
  });
}

export function useDeleteCenter(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (id: string) => service.deleteCenter(schoolId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'centers', schoolId] });
    },
  });
}

export function useExecutiveCockpits(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipExecutiveCockpit[]>({
    queryKey: [QUERY_KEY, 'cockpits', schoolId],
    queryFn: () => service.listCockpits(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateCockpit(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createCockpit(schoolId, data as Omit<GeaesipExecutiveCockpit, 'id' | 'computedAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'cockpits', schoolId] });
    },
  });
}

export function useAlerts(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAlert[]>({
    queryKey: [QUERY_KEY, 'alerts', schoolId],
    queryFn: () => service.listAlerts(schoolId),
    enabled: !!schoolId,
  });
}

export function useUnacknowledgedAlerts(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipAlert[]>({
    queryKey: [QUERY_KEY, 'alerts', 'unacknowledged', schoolId],
    queryFn: () => service.listUnacknowledgedAlerts(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateAlert(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createAlert(schoolId, data as Omit<GeaesipAlert, 'id' | 'createdAt' | 'acknowledged' | 'acknowledgedBy'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'alerts', schoolId] });
    },
  });
}

export function useAcknowledgeAlert(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) =>
      service.acknowledgeAlert(schoolId, id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'alerts', schoolId] });
    },
  });
}

export function useDecisionQueues(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<GeaesipDecisionQueue[]>({
    queryKey: [QUERY_KEY, 'decision-queues', schoolId],
    queryFn: () => service.listDecisionQueues(schoolId),
    enabled: !!schoolId,
  });
}

export function useCreateDecisionQueue(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDecisionQueue(schoolId, data as Omit<GeaesipDecisionQueue, 'id' | 'createdAt'>),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, 'decision-queues', schoolId] });
    },
  });
}

export function useControlCenterStats(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery({
    queryKey: [QUERY_KEY, 'stats', schoolId],
    queryFn: () => service.getControlCenterStats(schoolId),
    enabled: !!schoolId,
  });
}
