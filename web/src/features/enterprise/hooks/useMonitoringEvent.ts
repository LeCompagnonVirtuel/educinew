import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseMonitoringService } from '../services/enterprise-monitoring.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { MonitoringEvent } from '../types';

export function useMonitoringEvent(supabase: any, schoolId: string, eventId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseMonitoringService(repo);
  const [data, setData] = useState<MonitoringEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!eventId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const events = await service.getEvents(schoolId);
      const found = events.find((e: any) => e.id === eventId);
      setData(found || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, eventId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
