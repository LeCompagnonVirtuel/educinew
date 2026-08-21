'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ResearchTrendService } from '../services';
import type { GedkinResearchTrend } from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const RESEARCH_TREND_QUERY_KEY = 'gedkin-research-trend';

function createService(): ResearchTrendService {
  return new ResearchTrendService();
}

export function useResearchTrends(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinResearchTrend>>({
    queryKey: [RESEARCH_TREND_QUERY_KEY, 'trends', schoolId, params, filters],
    queryFn: () => service.listTrends(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
