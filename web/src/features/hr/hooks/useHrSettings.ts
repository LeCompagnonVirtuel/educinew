import { useState, useEffect, useCallback } from 'react';
import { createSettingsService } from '../services/settings.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrSettings(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createSettingsService(repo);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getSettings(schoolId);
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
