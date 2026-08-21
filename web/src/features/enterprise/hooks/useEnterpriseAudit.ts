import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseAuditService } from '../services/enterprise-audit.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseAuditLog } from '../types';

export function useEnterpriseAudit(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseAuditService(repo);
  const [data, setData] = useState<EnterpriseAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findAuditLogs(schoolId);
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
