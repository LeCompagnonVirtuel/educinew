import { useState, useEffect, useCallback } from 'react';
import { createEnterpriseMaintenanceService } from '../services/enterprise-maintenance.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { MaintenanceWindow } from '../types';

export function useMaintenanceWindow(supabase: any, schoolId: string, windowId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createEnterpriseMaintenanceService(repo);
  const [data, setData] = useState<MaintenanceWindow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!windowId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findWindowById(schoolId, windowId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, windowId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
