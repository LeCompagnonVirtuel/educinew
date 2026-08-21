'use client';

import { useState, useCallback } from 'react';
import { AdaptiveFrameworkService } from '../services/adaptive-framework.service';
import { createClient } from '@/lib/supabase/client';
import type { CompetencyFramework, CompetencyFrameworkCreate } from '@educi/types';

export const useAdaptiveFrameworkActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CompetencyFrameworkCreate): Promise<CompetencyFramework | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveFrameworkService(supabase);
      return await service.createFramework(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CompetencyFrameworkCreate>): Promise<CompetencyFramework | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveFrameworkService(supabase);
      return await service.updateFramework(schoolId, id, data);
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
      const service = new AdaptiveFrameworkService(supabase);
      await service.deleteFramework(schoolId, id);
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
