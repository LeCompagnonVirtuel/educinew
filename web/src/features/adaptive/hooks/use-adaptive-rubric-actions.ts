'use client';

import { useState, useCallback } from 'react';
import { AdaptiveRubricService } from '../services/adaptive-rubric.service';
import { createClient } from '@/lib/supabase/client';
import type { Rubric } from '@educi/types';

export const useAdaptiveRubricActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Rubric, 'id' | 'created_at'>): Promise<Rubric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRubricService(supabase);
      return await service.createRubric(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<Rubric, 'id' | 'created_at'>>): Promise<Rubric | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRubricService(supabase);
      return await service.updateRubric(schoolId, id, data);
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
      const service = new AdaptiveRubricService(supabase);
      await service.deleteRubric(schoolId, id);
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
