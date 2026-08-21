'use client';

import { useState, useCallback } from 'react';
import { IntAlertService } from '../services/int-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { AIAlert, AIAlertCreate } from '@educi/types';

export const useIntAlertActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AIAlertCreate): Promise<AIAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAlertService(supabase);
      return await service.createAlert(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AIAlertCreate>): Promise<AIAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAlertService(supabase);
      return await service.updateAlert(schoolId, id, data);
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
      const service = new IntAlertService(supabase);
      await service.deleteAlert(schoolId, id);
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
