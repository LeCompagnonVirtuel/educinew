import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseTimelineService } from '../services/enterprise-timeline.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseTimeline } from '../types';

export function useEnterpriseTimeline(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseTimelineService(repo);
  const [data, setData] = useState<EnterpriseTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getTimeline(schoolId);
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
