'use client';
import { useState, useCallback } from 'react';
import { ScWaterMonitorService } from '../services/sc-water-monitor.service';
import { createClient } from '@/lib/supabase/client';
import type { WaterMonitor } from '@educi/types';

export const useScWaterMonitoring = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsage = useCallback(async (monitorId: string): Promise<WaterMonitor | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWaterMonitorService(createClient());
      return await service.getMonitor(schoolId, monitorId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTrends = useCallback(async (): Promise<WaterMonitor[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWaterMonitorService(createClient());
      return await service.listMonitors(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAlerts = useCallback(async (): Promise<WaterMonitor[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWaterMonitorService(createClient());
      return await service.listMonitors(schoolId, { status: 'alert' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getUsage, getTrends, getAlerts };
};
