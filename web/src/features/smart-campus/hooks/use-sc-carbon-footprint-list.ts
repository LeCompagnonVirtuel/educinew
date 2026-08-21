'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScCarbonFootprintService } from '../services/sc-carbon-footprint.service';
import { createClient } from '@/lib/supabase/client';
import type { CarbonFootprint } from '@educi/types';

export const useScCarbonFootprintList = (schoolId: string) => {
  const [footprints, setFootprints] = useState<CarbonFootprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFootprints = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScCarbonFootprintService(createClient());
      const data = await service.listFootprints(schoolId);
      setFootprints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchFootprints();
  }, [fetchFootprints]);

  return { footprints, loading, error, refresh: fetchFootprints };
};
