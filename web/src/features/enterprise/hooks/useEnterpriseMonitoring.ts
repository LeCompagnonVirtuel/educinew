import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseMonitoringService } from '../services/enterprise-monitoring.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { MonitoringEvent } from '../types';

export function useEnterpriseMonitoring(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseMonitoringService(repo);
  const [data, setData] = useState<MonitoringEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getEvents(schoolId);
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
