'use client';

import { useState, useCallback } from 'react';
import { AdaptiveHomeworkService } from '../services/adaptive-homework.service';
import { createClient } from '@/lib/supabase/client';
import type { AdaptiveHomework, AdaptiveHomeworkCreate } from '@educi/types';

export const useAdaptiveHomeworkActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AdaptiveHomeworkCreate): Promise<AdaptiveHomework | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveHomeworkService(supabase);
      return await service.createAdaptiveHomework(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AdaptiveHomeworkCreate>): Promise<AdaptiveHomework | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveHomeworkService(supabase);
      return await service.updateAdaptiveHomework(schoolId, id, data);
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
      const service = new AdaptiveHomeworkService(supabase);
      await service.deleteAdaptiveHomework(schoolId, id);
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
