'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SemanticService } from '../services';
import type {
  GedkinSemanticConcept,
  GedkinOntology,
  GedkinTaxonomy,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const SEMANTIC_QUERY_KEY = 'gedkin-semantic';

function createService(): SemanticService {
  return new SemanticService();
}

export function useSemanticConcepts(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinSemanticConcept>>({
    queryKey: [SEMANTIC_QUERY_KEY, 'concepts', schoolId, params, filters],
    queryFn: () => service.listConcepts(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useOntologies(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinOntology>>({
    queryKey: [SEMANTIC_QUERY_KEY, 'ontologies', schoolId, params, filters],
    queryFn: () => service.listOntologies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useTaxonomies(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinTaxonomy>>({
    queryKey: [SEMANTIC_QUERY_KEY, 'taxonomies', schoolId, params, filters],
    queryFn: () => service.listTaxonomies(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useSemanticSearch(
  schoolId: string,
  ontologyId: string,
  params: PaginationParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinSemanticConcept>>({
    queryKey: [SEMANTIC_QUERY_KEY, 'search', schoolId, ontologyId, params],
    queryFn: () => service.listByOntology(schoolId, ontologyId, params),
    enabled: !!schoolId && !!ontologyId,
  });
}
