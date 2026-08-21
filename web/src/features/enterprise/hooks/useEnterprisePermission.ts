import { useState, useCallback } from 'react';
import { createEnterprisePermissionService } from '../services/enterprise-permission.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';

export function useEnterprisePermission(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterprisePermissionService(repo);
  const [data, setData] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPermission = useCallback(async (userId: string, permission: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.checkPermission(schoolId, userId, permission);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { data, loading, error, checkPermission };
}
