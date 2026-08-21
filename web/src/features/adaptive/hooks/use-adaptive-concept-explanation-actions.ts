'use client';

import { useState, useCallback } from 'react';
import { AdaptiveConceptExplanationService } from '../services/adaptive-concept-explanation.service';
import { createClient } from '@/lib/supabase/client';
import type { ConceptExplanation, ConceptExplanationCreate } from '@educi/types';

export const useAdaptiveConceptExplanationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ConceptExplanationCreate): Promise<ConceptExplanation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveConceptExplanationService(supabase);
      return await service.createExplanation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ConceptExplanationCreate>): Promise<ConceptExplanation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveConceptExplanationService(supabase);
      return await service.updateExplanation(schoolId, id, data);
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
      const service = new AdaptiveConceptExplanationService(supabase);
      await service.deleteExplanation(schoolId, id);
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
