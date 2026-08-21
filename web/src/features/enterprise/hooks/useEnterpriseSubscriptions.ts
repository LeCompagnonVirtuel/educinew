import { useState, useEffect, useCallback } from 'react';
import { createSubscriptionService } from '../services/subscription.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSubscription } from '../types';

export function useEnterpriseSubscriptions(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSubscriptionService(repo);
  const [data, setData] = useState<EnterpriseSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findSubscriptions(schoolId);
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
