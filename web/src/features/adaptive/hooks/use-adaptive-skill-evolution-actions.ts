'use client';

import { useState, useCallback } from 'react';
import { AdaptiveSkillEvolutionService } from '../services/adaptive-skill-evolution.service';
import { createClient } from '@/lib/supabase/client';
import type { SkillEvolution, SkillEvolutionCreate } from '@educi/types';

export const useAdaptiveSkillEvolutionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SkillEvolutionCreate): Promise<SkillEvolution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSkillEvolutionService(supabase);
      return await service.createEvolution(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SkillEvolutionCreate>): Promise<SkillEvolution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSkillEvolutionService(supabase);
      return await service.updateEvolution(schoolId, id, data);
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
      const service = new AdaptiveSkillEvolutionService(supabase);
      await service.deleteEvolution(schoolId, id);
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
