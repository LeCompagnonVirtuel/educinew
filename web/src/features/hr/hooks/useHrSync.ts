import { useState, useCallback } from 'react';
import { createSyncService } from '../services/sync.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrSync(supabase: any) {
  const repo = createHRRepository(supabase);
  const service = createSyncService(repo);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncEmployees = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.syncEmployees(schoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getSyncStatus = useCallback(async (schoolId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getSyncStatus(schoolId);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, syncEmployees, getSyncStatus };
}
