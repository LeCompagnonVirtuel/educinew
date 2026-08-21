import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseUserService } from '../services/enterprise-user.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseUser } from '../types';

export function useEnterpriseUser(supabase: any, schoolId: string, userId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseUserService(repo);
  const [data, setData] = useState<EnterpriseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findUserById(schoolId, userId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, userId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
