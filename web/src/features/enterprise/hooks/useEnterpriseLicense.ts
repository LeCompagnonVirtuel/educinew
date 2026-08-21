import { useState, useEffect, useCallback } from 'react';
import { createLicenseService } from '../services/license.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseLicense } from '../types';

export function useEnterpriseLicense(supabase: any, schoolId: string, licenseId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createLicenseService(repo);
  const [data, setData] = useState<EnterpriseLicense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!licenseId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findLicenseById(schoolId, licenseId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, licenseId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
