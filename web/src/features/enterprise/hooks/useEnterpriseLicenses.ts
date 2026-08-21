import { useState, useEffect, useCallback } from 'react';
import { createLicenseService } from '../services/license.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseLicense } from '../types';

export function useEnterpriseLicenses(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createLicenseService(repo);
  const [data, setData] = useState<EnterpriseLicense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findLicenses(schoolId);
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
