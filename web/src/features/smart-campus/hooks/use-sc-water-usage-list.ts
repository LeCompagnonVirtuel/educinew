'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScWaterUsageService } from '../services/sc-water-usage.service';
import { createClient } from '@/lib/supabase/client';
import type { WaterUsage } from '@educi/types';

export const useScWaterUsageList = (schoolId: string) => {
  const [usages, setUsages] = useState<WaterUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsages = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScWaterUsageService(createClient());
      const data = await service.listUsages(schoolId);
      setUsages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchUsages();
  }, [fetchUsages]);

  return { usages, loading, error, refresh: fetchUsages };
};
