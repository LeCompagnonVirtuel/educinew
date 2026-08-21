import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseAnalyticsService } from '../services/enterprise-analytics.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseAnalytics } from '../types';

export function useEnterpriseAnalytics(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseAnalyticsService(repo);
  const [data, setData] = useState<EnterpriseAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getSnapshots(schoolId);
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
