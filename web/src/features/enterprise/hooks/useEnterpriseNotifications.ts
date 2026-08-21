import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseNotificationService } from '../services/enterprise-notification.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseNotification } from '../types';

export function useEnterpriseNotifications(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseNotificationService(repo);
  const [data, setData] = useState<EnterpriseNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findNotifications(schoolId);
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
