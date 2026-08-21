'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CitationService } from '../services';
import type { GedkinCitation } from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const CITATION_QUERY_KEY = 'gedkin-citation';

function createService(): CitationService {
  return new CitationService();
}

export function useCitations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinCitation>>({
    queryKey: [CITATION_QUERY_KEY, 'citations', schoolId, params, filters],
    queryFn: () => service.listCitations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCitationNetwork(
  schoolId: string,
  publicationId: string,
) {
  const service = useMemo(() => createService(), []);

  return useQuery<{
    incoming: GedkinCitation[];
    outgoing: GedkinCitation[];
    totalIncoming: number;
    totalOutgoing: number;
  }>({
    queryKey: [CITATION_QUERY_KEY, 'network', schoolId, publicationId],
    queryFn: () => service.getCitationNetwork(schoolId, publicationId),
    enabled: !!schoolId && !!publicationId,
  });
}
