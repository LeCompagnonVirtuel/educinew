'use client';

import { useState, useCallback } from 'react';
import { EntHealthAlertService } from '../services/health-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthAlert, HealthAlertCreate } from '@educi/types';

export const useEntHealthAlertActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthAlertCreate): Promise<HealthAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthAlertService(supabase);
      return await service.createHealthAlert(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthAlertCreate>): Promise<HealthAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthAlertService(supabase);
      return await service.updateHealthAlert(schoolId, id, data);
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
      const service = new EntHealthAlertService(supabase);
      await service.deleteHealthAlert(schoolId, id);
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
