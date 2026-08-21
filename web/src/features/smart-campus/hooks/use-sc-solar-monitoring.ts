'use client';
import { useState, useCallback } from 'react';
import { ScSolarProductionService } from '../services/sc-solar-production.service';
import { createClient } from '@/lib/supabase/client';
import type { SolarProduction } from '@educi/types';

export const useScSolarMonitoring = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProduction = useCallback(async (productionId: string): Promise<SolarProduction | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSolarProductionService(createClient());
      return await service.getProduction(schoolId, productionId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTrends = useCallback(async (): Promise<SolarProduction[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSolarProductionService(createClient());
      return await service.listProductions(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getEfficiency = useCallback(async (): Promise<SolarProduction[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScSolarProductionService(createClient());
      return await service.listProductions(schoolId, { type: 'efficiency' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getProduction, getTrends, getEfficiency };
};
