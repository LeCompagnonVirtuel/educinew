import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseRoleService } from '../services/enterprise-role.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseRole } from '../types';

export function useEnterpriseRole(supabase: any, schoolId: string, roleId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseRoleService(repo);
  const [data, setData] = useState<EnterpriseRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!roleId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findRoleById(schoolId, roleId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, roleId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
