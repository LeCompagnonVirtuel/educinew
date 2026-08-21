'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { DeviceSecurityService } from '../services';
import type {
  GestcrpDeviceInventory,
  GestcrpMDMCommand,
  GestcrpDeviceCompliance,
} from '../repositories/device-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';

const QUERY_KEY = 'gestcrp-device-security';

function createService(): DeviceSecurityService {
  return new DeviceSecurityService();
}

export function useDeviceInventory(
  schoolId: string,
  params: PaginationParams = {},
  filters: Record<string, unknown> = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpDeviceInventory>>({
    queryKey: [QUERY_KEY, 'devices', schoolId, params, filters],
    queryFn: () => service.listDevices(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateDevice() {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  const mutation = useMutation({
    mutationFn: (payload: { schoolId: string; data: Record<string, unknown> }) =>
      service.registerDevice(payload.schoolId, payload.data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, 'devices', variables.schoolId],
      });
    },
  });

  const createDevice = useCallback(
    (schoolId: string, data: Record<string, unknown>) =>
      mutation.mutateAsync({ schoolId, data }),
    [mutation],
  );

  return {
    createDevice,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useMDMCommands(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpMDMCommand>>({
    queryKey: [QUERY_KEY, 'mdm-commands', schoolId, params],
    queryFn: () => service.listMDMCommands(schoolId, params),
    enabled: !!schoolId,
  });
}

export function useDeviceCompliance(
  schoolId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GestcrpDeviceCompliance>>({
    queryKey: [QUERY_KEY, 'compliance', schoolId, params],
    queryFn: () => service.listCompliance(schoolId, params),
    enabled: !!schoolId,
  });
}
