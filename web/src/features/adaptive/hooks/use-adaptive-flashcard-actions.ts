'use client';

import { useState, useCallback } from 'react';
import { AdaptiveFlashcardService } from '../services/adaptive-flashcard.service';
import { createClient } from '@/lib/supabase/client';
import type { Flashcard } from '@educi/types';

export const useAdaptiveFlashcardActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Flashcard, 'id' | 'created_at'>): Promise<Flashcard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveFlashcardService(supabase);
      return await service.createFlashcard(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<Flashcard, 'id' | 'created_at'>>): Promise<Flashcard | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveFlashcardService(supabase);
      return await service.updateFlashcard(schoolId, id, data);
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
      const service = new AdaptiveFlashcardService(supabase);
      await service.deleteFlashcard(schoolId, id);
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
