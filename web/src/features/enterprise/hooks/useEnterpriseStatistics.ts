import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseStatisticsService } from '../services/enterprise-statistics.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseStatistics } from '../types';

export function useEnterpriseStatistics(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseStatisticsService(repo);
  const [data, setData] = useState<EnterpriseStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getStatistics(schoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
