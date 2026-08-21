'use client';

import { useState, useCallback } from 'react';
import { EntAlertInhibitionService } from '../services/alert-inhibition.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertInhibition, AlertInhibitionCreate } from '@educi/types';

export const useEntAlertInhibitionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertInhibitionCreate): Promise<AlertInhibition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertInhibitionService(supabase);
      return await service.createAlertInhibition(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertInhibitionCreate>): Promise<AlertInhibition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertInhibitionService(supabase);
      return await service.updateAlertInhibition(schoolId, id, data);
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
      const service = new EntAlertInhibitionService(supabase);
      await service.deleteAlertInhibition(schoolId, id);
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
