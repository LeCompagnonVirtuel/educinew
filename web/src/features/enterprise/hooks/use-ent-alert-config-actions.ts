'use client';

import { useState, useCallback } from 'react';
import { EntAlertConfigService } from '../services/alert-config.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertConfig, AlertConfigCreate } from '@educi/types';

export const useEntAlertConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertConfigCreate): Promise<AlertConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertConfigService(supabase);
      return await service.createAlertConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertConfigCreate>): Promise<AlertConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertConfigService(supabase);
      return await service.updateAlertConfig(schoolId, id, data);
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
      const service = new EntAlertConfigService(supabase);
      await service.deleteAlertConfig(schoolId, id);
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
