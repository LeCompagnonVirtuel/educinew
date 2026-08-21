import { useState, useEffect, useCallback } from 'react';
import { createNotificationService } from '../services/notification.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { HRNotification } from '../types';

export function useHrNotifications(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createNotificationService(repo);
  const [data, setData] = useState<HRNotification[]>([]);
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
