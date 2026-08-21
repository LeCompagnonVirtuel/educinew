'use client';

import { useState, useCallback } from 'react';
import { IntClassificationService } from '../services/int-classification.service';
import { createClient } from '@/lib/supabase/client';
import type { AutoClassification, AutoClassificationCreate } from '@educi/types';

export const useIntClassificationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutoClassificationCreate): Promise<AutoClassification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntClassificationService(supabase);
      return await service.createClassification(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutoClassificationCreate>): Promise<AutoClassification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntClassificationService(supabase);
      return await service.updateClassification(schoolId, id, data);
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
      const service = new IntClassificationService(supabase);
      await service.deleteClassification(schoolId, id);
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