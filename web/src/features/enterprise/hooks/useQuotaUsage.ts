import { useState, useEffect, useCallback } from 'react';
import { createQuotaService } from '../services/quota.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { QuotaUsage } from '../types';

export function useQuotaUsage(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createQuotaService(repo);
  const [data, setData] = useState<QuotaUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.checkQuota(schoolId, 'default');
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
