'use client';
import { useState, useCallback } from 'react';
import { ScWaterUsageService } from '../services/sc-water-usage.service';
import { createClient } from '@/lib/supabase/client';
import type { WaterUsage } from '@educi/types';

export const useScWaterUsage = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsage = useCallback(async (usageId: string): Promise<WaterUsage | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWaterUsageService(createClient());
      return await service.getUsage(schoolId, usageId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTrends = useCallback(async (): Promise<WaterUsage[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWaterUsageService(createClient());
      return await service.listUsages(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAlerts = useCallback(async (): Promise<WaterUsage[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScWaterUsageService(createClient());
      return await service.listUsages(schoolId, { status: 'alert' });
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
