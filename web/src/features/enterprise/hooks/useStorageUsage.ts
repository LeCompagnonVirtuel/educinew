import { useState, useEffect, useCallback } from 'react';
import { createStorageService } from '../services/storage.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { StorageUsage } from '../types';

export function useStorageUsage(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createStorageService(repo);
  const [data, setData] = useState<StorageUsage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getUsage(schoolId);
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
