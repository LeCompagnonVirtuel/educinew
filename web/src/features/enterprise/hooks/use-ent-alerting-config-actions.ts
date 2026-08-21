'use client';

import { useState, useCallback } from 'react';
import { EntAlertingConfigService } from '../services/alerting-config.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertingConfig, AlertingConfigCreate } from '@educi/types';

export const useEntAlertingConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertingConfigCreate): Promise<AlertingConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertingConfigService(supabase);
      return await service.createAlertingConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertingConfigCreate>): Promise<AlertingConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertingConfigService(supabase);
      return await service.updateAlertingConfig(schoolId, id, data);
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
      const service = new EntAlertingConfigService(supabase);
      await service.deleteAlertingConfig(schoolId, id);
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
