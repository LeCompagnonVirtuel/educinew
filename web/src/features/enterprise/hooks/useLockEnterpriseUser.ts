import { useState, useCallback } from 'react';
import { createEnterpriseUserService } from '../services/enterprise-user.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseUser } from '../types';

export function useLockEnterpriseUser(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseUserService(repo);
  const [data, setData] = useState<EnterpriseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lockUser = useCallback(async (userId: string, reason?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.lockUser(schoolId, userId, reason);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, lockUser };
}
