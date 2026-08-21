'use client';

import { useState, useCallback } from 'react';
import { AdaptiveCognitiveService } from '../services/adaptive-cognitive.service';
import { createClient } from '@/lib/supabase/client';
import type { CognitiveProfile, CognitiveProfileCreate } from '@educi/types';

export const useAdaptiveCognitiveActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CognitiveProfileCreate): Promise<CognitiveProfile | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCognitiveService(supabase);
      return await service.createCognitiveProfile(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CognitiveProfileCreate>): Promise<CognitiveProfile | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCognitiveService(supabase);
      return await service.updateCognitiveProfile(schoolId, id, data);
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
      const service = new AdaptiveCognitiveService(supabase);
      await service.deleteCognitiveProfile(schoolId, id);
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
