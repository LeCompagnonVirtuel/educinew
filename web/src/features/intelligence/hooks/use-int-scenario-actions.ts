'use client';

import { useState, useCallback } from 'react';
import { IntScenarioService } from '../services/int-scenario.service';
import { createClient } from '@/lib/supabase/client';
import type { Scenario, ScenarioCreate } from '@educi/types';

export const useIntScenarioActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ScenarioCreate): Promise<Scenario | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntScenarioService(supabase);
      return await service.createScenario(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ScenarioCreate>): Promise<Scenario | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntScenarioService(supabase);
      return await service.updateScenario(schoolId, id, data);
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
      const service = new IntScenarioService(supabase);
      await service.deleteScenario(schoolId, id);
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