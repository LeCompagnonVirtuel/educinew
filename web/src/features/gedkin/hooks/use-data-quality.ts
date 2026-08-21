'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { DataQualityService } from '../services';
import type { GedkinDataQuality_ } from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const DATA_QUALITY_QUERY_KEY = 'gedkin-data-quality';

function createService(): DataQualityService {
  return new DataQualityService();
}

export function useDataQualityChecks(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinDataQuality_>>({
    queryKey: [DATA_QUALITY_QUERY_KEY, 'checks', schoolId, params, filters],
    queryFn: () => service.listQualityChecks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useDataQualityStats(schoolId: string, domainId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<number>({
    queryKey: [DATA_QUALITY_QUERY_KEY, 'stats', schoolId, domainId],
    queryFn: () => service.getOverallQualityScore(schoolId, domainId),
    enabled: !!schoolId && !!domainId,
  });
}
