'use client';

import { useState, useCallback } from 'react';
import { AdaptiveCompetencyService } from '../services/adaptive-competency.service';
import { createClient } from '@/lib/supabase/client';
import type { Competency, CompetencyCreate } from '@educi/types';

export const useAdaptiveCompetencyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CompetencyCreate): Promise<Competency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCompetencyService(supabase);
      return await service.createCompetency(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CompetencyCreate>): Promise<Competency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCompetencyService(supabase);
      return await service.updateCompetency(schoolId, id, data as any);
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
      const service = new AdaptiveCompetencyService(supabase);
      await service.deleteCompetency(schoolId, id);
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
