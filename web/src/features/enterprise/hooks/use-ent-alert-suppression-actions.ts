'use client';

import { useState, useCallback } from 'react';
import { EntAlertSuppressionService } from '../services/alert-suppression.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertSuppression, AlertSuppressionCreate } from '@educi/types';

export const useEntAlertSuppressionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertSuppressionCreate): Promise<AlertSuppression | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertSuppressionService(supabase);
      return await service.createAlertSuppression(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertSuppressionCreate>): Promise<AlertSuppression | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertSuppressionService(supabase);
      return await service.updateAlertSuppression(schoolId, id, data);
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
      const service = new EntAlertSuppressionService(supabase);
      await service.deleteAlertSuppression(schoolId, id);
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
