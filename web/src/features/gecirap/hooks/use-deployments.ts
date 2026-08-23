'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { DeploymentService } from '../services';
import type {
  GecirapCloudDeployment,
} from '../repositories/cloud-infrastructure-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';

const QUERY_KEY = 'gecirap-deployments';

function createService(): DeploymentService {
  return new DeploymentService();
}

export function useDeployments(
  schoolId: string,
  params: PaginationParams = {},
  filters: FilterParams = {},
) {
  const service = useMemo(() => createService(), []);

  return useQuery<PaginatedResult<GecirapCloudDeployment>>({
    queryKey: [QUERY_KEY, schoolId, params, filters],
    queryFn: () => service.listCloudDeployments(schoolId, params, filters),
    enabled: !!schoolId,
  });
}
