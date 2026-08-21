'use client';
import { useState, useCallback } from 'react';
import { ScCarbonFootprintService } from '../services/sc-carbon-footprint.service';
import { createClient } from '@/lib/supabase/client';
import type { CarbonFootprint, CarbonFootprintCreate } from '@educi/types';

export const useScCarbonTracking = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFootprint = useCallback(async (footprintId: string): Promise<CarbonFootprint | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScCarbonFootprintService(createClient());
      return await service.getFootprint(schoolId, footprintId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTrends = useCallback(async (): Promise<CarbonFootprint[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScCarbonFootprintService(createClient());
      return await service.listFootprints(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getGoals = useCallback(async (): Promise<CarbonFootprint[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScCarbonFootprintService(createClient());
      return await service.listFootprints(schoolId, { type: 'goal' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getFootprint, getTrends, getGoals };
};
