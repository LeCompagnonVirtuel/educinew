'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSolarProductionService } from '../services/sc-solar-production.service';
import { createClient } from '@/lib/supabase/client';
import type { SolarProduction } from '@educi/types';

export const useScSolarProductionList = (schoolId: string) => {
  const [productions, setProductions] = useState<SolarProduction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductions = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSolarProductionService(createClient());
      const data = await service.listProductions(schoolId);
      setProductions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchProductions();
  }, [fetchProductions]);

  return { productions, loading, error, refresh: fetchProductions };
};
