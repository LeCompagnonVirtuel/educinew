'use client';

import { useState, useCallback } from 'react';
import { EntAlertEscalationService } from '../services/alert-escalation.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertEscalation, AlertEscalationCreate } from '@educi/types';

export const useEntAlertEscalationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertEscalationCreate): Promise<AlertEscalation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertEscalationService(supabase);
      return await service.createAlertEscalation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertEscalationCreate>): Promise<AlertEscalation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertEscalationService(supabase);
      return await service.updateAlertEscalation(schoolId, id, data);
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
      const service = new EntAlertEscalationService(supabase);
      await service.deleteAlertEscalation(schoolId, id);
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
