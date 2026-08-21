import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseWebhookService } from '../services/enterprise-webhook.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';

export function useEnterpriseWebhooks(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseWebhookService(repo);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findWebhooks(schoolId);
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
