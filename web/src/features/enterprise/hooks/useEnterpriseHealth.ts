import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseHealthService } from '../services/enterprise-health.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { SystemHealth } from '../types';

export function useEnterpriseHealth(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseHealthService(repo);
  const [data, setData] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.runHealthChecks(schoolId);
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
