'use client';

import { useState, useCallback } from 'react';
import { EntAlertReceiverService } from '../services/alert-receiver.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertReceiver, AlertReceiverCreate } from '@educi/types';

export const useEntAlertReceiverActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertReceiverCreate): Promise<AlertReceiver | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertReceiverService(supabase);
      return await service.createAlertReceiver(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertReceiverCreate>): Promise<AlertReceiver | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertReceiverService(supabase);
      return await service.updateAlertReceiver(schoolId, id, data);
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
      const service = new EntAlertReceiverService(supabase);
      await service.deleteAlertReceiver(schoolId, id);
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
