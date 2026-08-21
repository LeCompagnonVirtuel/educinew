'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { BenchmarkService } from '../services';
import type {
  GedkinBenchmark,
  GedkinSDGAlignment,
} from '@educi/types';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';

const BENCHMARK_QUERY_KEY = 'gedkin-benchmark';

function createService(): BenchmarkService {
  return new BenchmarkService();
}

export function useBenchmarks(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinBenchmark>>({
    queryKey: [BENCHMARK_QUERY_KEY, 'benchmarks', schoolId, params, filters],
    queryFn: () => service.listBenchmarks(schoolId, params, filters),
    enabled: !!schoolId,
  });
}

export function useCreateBenchmark(schoolId: string) {
  const queryClient = useQueryClient();
  const service = useMemo(() => createService(), []);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      service.createBenchmark(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [BENCHMARK_QUERY_KEY, 'benchmarks', schoolId],
      });
    },
  });
}

export function useSDGAlignment(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GedkinSDGAlignment>>({
    queryKey: [BENCHMARK_QUERY_KEY, 'sdg', schoolId, params, filters],
    queryFn: () => service.listSDGAlignments(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
