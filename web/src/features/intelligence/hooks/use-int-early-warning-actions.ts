'use client';

import { useState, useCallback } from 'react';
import { IntEarlyWarningService } from '../services/int-early-warning.service';
import { createClient } from '@/lib/supabase/client';
import type { EarlyWarning, EarlyWarningCreate } from '@educi/types';

export const useIntEarlyWarningActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EarlyWarningCreate): Promise<EarlyWarning | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntEarlyWarningService(supabase);
      return await service.createEarlyWarning(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EarlyWarningCreate>): Promise<EarlyWarning | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntEarlyWarningService(supabase);
      return await service.updateEarlyWarning(schoolId, id, data);
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
      const service = new IntEarlyWarningService(supabase);
      await service.deleteEarlyWarning(schoolId, id);
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
