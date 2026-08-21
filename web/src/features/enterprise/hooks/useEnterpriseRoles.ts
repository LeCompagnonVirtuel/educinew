import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseRoleService } from '../services/enterprise-role.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseRole } from '../types';

export function useEnterpriseRoles(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseRoleService(repo);
  const [data, setData] = useState<EnterpriseRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findRoles(schoolId);
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
