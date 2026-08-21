'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScWaterMonitorService } from '../services/sc-water-monitor.service';
import { createClient } from '@/lib/supabase/client';
import type { WaterMonitor } from '@educi/types';

export const useScWaterMonitorList = (schoolId: string) => {
  const [monitors, setMonitors] = useState<WaterMonitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitors = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScWaterMonitorService(createClient());
      const data = await service.listMonitors(schoolId);
      setMonitors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchMonitors();
  }, [fetchMonitors]);

  return { monitors, loading, error, refresh: fetchMonitors };
};
