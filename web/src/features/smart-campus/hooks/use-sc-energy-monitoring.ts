'use client';
import { useState, useCallback } from 'react';
import { ScEnergyMonitorService } from '../services/sc-energy-monitor.service';
import { createClient } from '@/lib/supabase/client';
import type { EnergyMonitor } from '@educi/types';

export const useScEnergyMonitoring = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getConsumption = useCallback(async (monitorId: string): Promise<EnergyMonitor | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEnergyMonitorService(createClient());
      return await service.getMonitor(schoolId, monitorId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTrends = useCallback(async (): Promise<EnergyMonitor[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEnergyMonitorService(createClient());
      return await service.listMonitors(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getCosts = useCallback(async (): Promise<EnergyMonitor[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEnergyMonitorService(createClient());
      return await service.listMonitors(schoolId, { type: 'cost' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getConsumption, getTrends, getCosts };
};
