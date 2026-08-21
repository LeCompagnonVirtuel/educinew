import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseSettingsService } from '../services/enterprise-settings.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSettings } from '../types';

export function useEnterpriseSettings(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseSettingsService(repo);
  const [data, setData] = useState<EnterpriseSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findSettings(schoolId);
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
