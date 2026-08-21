'use client';

import { useState, useCallback } from 'react';
import { AdaptiveTutorService } from '../services/adaptive-tutor.service';
import { createClient } from '@/lib/supabase/client';
import type { AITutor, AITutorCreate } from '@educi/types';

export const useAdaptiveTutorActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AITutorCreate): Promise<AITutor | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTutorService(supabase);
      return await service.createTutor(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AITutorCreate>): Promise<AITutor | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTutorService(supabase);
      return await service.updateTutor(schoolId, id, data);
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
      const service = new AdaptiveTutorService(supabase);
      await service.deleteTutor(schoolId, id);
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
