import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseDashboardService } from '../services/enterprise-dashboard.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseDashboard } from '../types';

export function useEnterpriseDashboard(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseDashboardService(repo);
  const [data, setData] = useState<EnterpriseDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getDashboard(schoolId);
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
