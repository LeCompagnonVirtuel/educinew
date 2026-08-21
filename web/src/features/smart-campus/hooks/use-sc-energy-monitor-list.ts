'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEnergyMonitorService } from '../services/sc-energy-monitor.service';
import { createClient } from '@/lib/supabase/client';
import type { EnergyMonitor } from '@educi/types';

export const useScEnergyMonitorList = (schoolId: string) => {
  const [monitors, setMonitors] = useState<EnergyMonitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMonitors = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEnergyMonitorService(createClient());
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
