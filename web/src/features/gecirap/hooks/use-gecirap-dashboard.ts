'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SecurityDashboardService } from '../services';
import type { SecurityOverview } from '../services';

const QUERY_KEY = 'gecirap-dashboard';

function createService(): SecurityDashboardService {
  return new SecurityDashboardService();
}

export function useGecirapDashboard(schoolId: string) {
  const service = useMemo(() => createService(), []);

  return useQuery<SecurityOverview>({
    queryKey: [QUERY_KEY, 'overview', schoolId],
    queryFn: () => service.getSecurityOverview(schoolId),
    enabled: !!schoolId,
  });
}
