import { useState, useCallback } from 'react';
import { createEnterpriseUserService } from '../services/enterprise-user.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseUser } from '../types';

export function useResetMfa(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseUserService(repo);
  const [data, setData] = useState<EnterpriseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetMfa = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.resetMfa(schoolId, userId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, resetMfa };
}
