import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseMaintenanceService } from '../services/enterprise-maintenance.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { MaintenanceWindow } from '../types';

export function useMaintenanceWindows(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseMaintenanceService(repo);
  const [data, setData] = useState<MaintenanceWindow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findWindows(schoolId);
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
