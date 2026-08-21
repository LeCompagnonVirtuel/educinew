'use client';

import { useState, useCallback } from 'react';
import { AdaptiveSimulationService } from '../services/adaptive-simulation.service';
import { createClient } from '@/lib/supabase/client';
import type { Simulation } from '@educi/types';

export const useAdaptiveSimulationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Simulation, 'id' | 'created_at'>): Promise<Simulation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSimulationService(supabase);
      return await service.createSimulation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<Simulation, 'id' | 'created_at'>>): Promise<Simulation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSimulationService(supabase);
      return await service.updateSimulation(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSimulationService(supabase);
      await service.deleteSimulation(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
