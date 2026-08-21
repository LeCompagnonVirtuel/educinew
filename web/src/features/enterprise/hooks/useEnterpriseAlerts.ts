import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseAlertService } from '../services/enterprise-alert.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { MonitoringEvent } from '../types';

export function useEnterpriseAlerts(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseAlertService(repo);
  const [data, setData] = useState<MonitoringEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getAlerts(schoolId);
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
