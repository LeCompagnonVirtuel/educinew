'use client';

import { useState, useCallback } from 'react';
import { EntAlertSilenceService } from '../services/alert-silence.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertSilence, AlertSilenceCreate } from '@educi/types';

export const useEntAlertSilenceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertSilenceCreate): Promise<AlertSilence | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertSilenceService(supabase);
      return await service.createAlertSilence(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertSilenceCreate>): Promise<AlertSilence | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertSilenceService(supabase);
      return await service.updateAlertSilence(schoolId, id, data);
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
      const service = new EntAlertSilenceService(supabase);
      await service.deleteAlertSilence(schoolId, id);
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
