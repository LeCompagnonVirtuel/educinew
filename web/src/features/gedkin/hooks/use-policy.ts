'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { PolicyService } from '../services';
import type {
  GedkinPolicy,
  GedkinPolicySimulation,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const POLICY_QUERY_KEY = 'gedkin-policy';

function createService(): PolicyService {
  return new PolicyService();
}

export function usePolicies(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinPolicy>>({
    queryKey: [POLICY_QUERY_KEY, 'policies', schoolId, params, filters],
    queryFn: () => service.listPolicies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreatePolicy(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createPolicy(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POLICY_QUERY_KEY, 'policies', schoolId],
      });
    },
  });
}

export function usePolicySimulations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinPolicySimulation>>({
    queryKey: [POLICY_QUERY_KEY, 'simulations', schoolId, params, filters],
    queryFn: () => service.listSimulations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
