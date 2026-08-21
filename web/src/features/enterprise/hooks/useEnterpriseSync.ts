import { useState, useCallback } from 'react';
import { createEnterpriseSyncService } from '../services/enterprise-sync.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';

export function useEnterpriseSync(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseSyncService(repo);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async (type: string, options?: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.sync(schoolId, type, options);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, sync };
}
