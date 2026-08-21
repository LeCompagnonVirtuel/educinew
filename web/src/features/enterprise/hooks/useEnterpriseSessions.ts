import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseSessionService } from '../services/enterprise-session.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSession } from '../types';

export function useEnterpriseSessions(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseSessionService(repo);
  const [data, setData] = useState<EnterpriseSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findSessions(schoolId);
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
