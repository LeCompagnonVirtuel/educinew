import { useState, useEffect, useCallback } from 'react';
import { createTimelineService } from '../services/timeline.service';
import { createHRRepository } from '../repositories/hr.repository';

export function useHrTimeline(supabase: any, schoolId: string, employeeId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createTimelineService(repo);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!employeeId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.getEmployeeTimeline(schoolId, employeeId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, employeeId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
