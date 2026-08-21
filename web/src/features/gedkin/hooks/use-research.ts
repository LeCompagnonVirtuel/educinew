'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ResearchService } from '../services';
import type {
  GedkinResearchProject,
  GedkinPublication,
  GedkinResearcherProfile,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const RESEARCH_QUERY_KEY = 'gedkin-research';

function createService(): ResearchService {
  return new ResearchService();
}

export function useResearchProjects(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinResearchProject>>({
    queryKey: [RESEARCH_QUERY_KEY, 'projects', schoolId, params, filters],
    queryFn: () => service.listProjects(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateResearchProject(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createProject(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RESEARCH_QUERY_KEY, 'projects', schoolId],
      });
    },
  });
}

export function usePublications(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinPublication>>({
    queryKey: [RESEARCH_QUERY_KEY, 'publications', schoolId, params, filters],
    queryFn: () => service.listPublications(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreatePublication(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createPublication(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [RESEARCH_QUERY_KEY, 'publications', schoolId],
      });
    },
  });
}

export function useResearcherProfiles(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinResearcherProfile>>({
    queryKey: [RESEARCH_QUERY_KEY, 'profiles', schoolId, params, filters],
    queryFn: () => service.listProfiles(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
