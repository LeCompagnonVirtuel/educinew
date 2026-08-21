'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MarketplaceService } from '../services';
import type {
  GedkinMarketplaceProduct,
  GedkinDataSubscription,
  GedkinProductReview,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const MARKETPLACE_QUERY_KEY = 'gedkin-marketplace';

function createService(): MarketplaceService {
  return new MarketplaceService();
}

export function useMarketplaceProducts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinMarketplaceProduct>>({
    queryKey: [MARKETPLACE_QUERY_KEY, 'products', schoolId, params, filters],
    queryFn: () => service.listProducts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateProduct(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createProduct(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MARKETPLACE_QUERY_KEY, 'products', schoolId],
      });
    },
  });
}

export function useSubscriptions(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDataSubscription>>({
    queryKey: [MARKETPLACE_QUERY_KEY, 'subscriptions', schoolId, params, filters],
    queryFn: () => service.listSubscriptions(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useProductReviews(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinProductReview>>({
    queryKey: [MARKETPLACE_QUERY_KEY, 'reviews', schoolId, params, filters],
    queryFn: () => service.listReviews(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
