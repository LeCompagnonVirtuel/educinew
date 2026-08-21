'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { DataFabricService } from '../services';
import type {
  GedkinDataDomain,
  GedkinDataProduct,
  GedkinDataContract,
  GedkinDataSource,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const DATA_FABRIC_QUERY_KEY = 'gedkin-data-fabric';

function createService(): DataFabricService {
  return new DataFabricService();
}

export function useDataDomains(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDataDomain>>({
    queryKey: [DATA_FABRIC_QUERY_KEY, 'domains', schoolId, params, filters],
    queryFn: () => service.listDomains(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateDataDomain(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDomain(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DATA_FABRIC_QUERY_KEY, 'domains', schoolId],
      });
    },
  });
}

export function useDataProducts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDataProduct>>({
    queryKey: [DATA_FABRIC_QUERY_KEY, 'products', schoolId, params, filters],
    queryFn: () => service.listProducts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateDataProduct(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createProduct(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [DATA_FABRIC_QUERY_KEY, 'products', schoolId],
      });
    },
  });
}

export function useDataContract(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDataContract>>({
    queryKey: [DATA_FABRIC_QUERY_KEY, 'contracts', schoolId, params, filters],
    queryFn: () => service.listContracts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useDataSource(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDataSource>>({
    queryKey: [DATA_FABRIC_QUERY_KEY, 'sources', schoolId, params, filters],
    queryFn: () => service.listSources(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
