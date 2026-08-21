import { useState, useEffect, useCallback } from 'react';
import { createApiUsageService } from '../services/api-usage.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { ApiUsage } from '../types';

export function useApiUsage(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createApiUsageService(repo);
  const [data, setData] = useState<ApiUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findApiUsage(schoolId);
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
