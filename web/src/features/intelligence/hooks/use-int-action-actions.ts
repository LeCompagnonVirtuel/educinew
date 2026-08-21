'use client';

import { useState, useCallback } from 'react';
import { IntActionService } from '../services/int-action.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceAction, IntelligenceActionCreate } from '@educi/types';

export const useIntActionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceActionCreate): Promise<IntelligenceAction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntActionService(supabase);
      return await service.createAction(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceActionCreate>): Promise<IntelligenceAction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntActionService(supabase);
      return await service.updateAction(schoolId, id, data);
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
      const service = new IntActionService(supabase);
      await service.deleteAction(schoolId, id);
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
