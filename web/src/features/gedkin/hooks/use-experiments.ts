'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ExperimentService } from '../services';
import { DatasetService } from '../services';
import type {
  GedkinExperiment,
  GedkinDataset_,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const EXPERIMENT_QUERY_KEY = 'gedkin-experiments';

function createExperimentService(): ExperimentService {
  return new ExperimentService();
}

function createDatasetService(): DatasetService {
  return new DatasetService();
}

export function useExperiments(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createExperimentService(), []);

  return useQuery<PaginatedResult<GedkinExperiment>>({
    queryKey: [EXPERIMENT_QUERY_KEY, 'experiments', schoolId, params, filters],
    queryFn: () => service.listExperiments(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateExperiment(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createExperimentService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createExperiment(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXPERIMENT_QUERY_KEY, 'experiments', schoolId],
      });
    },
  });
}

export function useDatasets(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createDatasetService(), []);

  return useQuery<PaginatedResult<GedkinDataset_>>({
    queryKey: [EXPERIMENT_QUERY_KEY, 'datasets', schoolId, params, filters],
    queryFn: () => service.listDatasets(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateDataset(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createDatasetService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createDataset(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [EXPERIMENT_QUERY_KEY, 'datasets', schoolId],
      });
    },
  });
}
