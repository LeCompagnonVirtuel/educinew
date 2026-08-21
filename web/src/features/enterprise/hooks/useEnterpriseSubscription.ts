import { useState, useEffect, useCallback } from 'react';
import { createSubscriptionService } from '../services/subscription.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseSubscription } from '../types';

export function useEnterpriseSubscription(supabase: any, schoolId: string, subscriptionId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createSubscriptionService(repo);
  const [data, setData] = useState<EnterpriseSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!subscriptionId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findSubscriptionById(schoolId, subscriptionId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, subscriptionId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
