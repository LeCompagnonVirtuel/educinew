'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { KnowledgeGraphService } from '../services';
import type {
  GedkinKnowledgeEntity,
  GedkinKnowledgeRelation,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const KNOWLEDGE_GRAPH_QUERY_KEY = 'gedkin-knowledge-graph';

function createService(): KnowledgeGraphService {
  return new KnowledgeGraphService();
}

export function useKnowledgeEntities(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinKnowledgeEntity>>({
    queryKey: [KNOWLEDGE_GRAPH_QUERY_KEY, 'entities', schoolId, params, filters],
    queryFn: () => service.listEntities(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateKnowledgeEntity(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createEntity(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KNOWLEDGE_GRAPH_QUERY_KEY, 'entities', schoolId],
      });
    },
  });
}

export function useKnowledgeRelations(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinKnowledgeRelation>>({
    queryKey: [KNOWLEDGE_GRAPH_QUERY_KEY, 'relations', schoolId, params, filters],
    queryFn: () => service.listRelations(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateKnowledgeRelation(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createRelation(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KNOWLEDGE_GRAPH_QUERY_KEY, 'relations', schoolId],
      });
    },
  });
}

export function useGraphTraversal(
  schoolId: string,
  entityId: string,
  depth: number = 1,
) {
  const service = useMemo(() => createService(), []);

  return useQuery<{
    entities: GedkinKnowledgeEntity[];
    relations: GedkinKnowledgeRelation[];
  }>({
    queryKey: [KNOWLEDGE_GRAPH_QUERY_KEY, 'traversal', schoolId, entityId, depth],
    queryFn: () => service.getNeighbors(schoolId, entityId, depth),
    enabled: !!schoolId && !!entityId,
  });
}
