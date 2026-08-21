import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseUserService } from '../services/enterprise-user.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseUser } from '../types';

export function useEnterpriseUsers(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseUserService(repo);
  const [data, setData] = useState<EnterpriseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findUsers(schoolId);
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
