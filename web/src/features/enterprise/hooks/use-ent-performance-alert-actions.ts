'use client';

import { useState, useCallback } from 'react';
import { EntPerformanceAlertService } from '../services/performance-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { PerformanceAlert, PerformanceAlertCreate } from '@educi/types';

export const useEntPerformanceAlertActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PerformanceAlertCreate): Promise<PerformanceAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceAlertService(supabase);
      return await service.createPerformanceAlert(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PerformanceAlertCreate>): Promise<PerformanceAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPerformanceAlertService(supabase);
      return await service.updatePerformanceAlert(schoolId, id, data);
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
      const service = new EntPerformanceAlertService(supabase);
      await service.deletePerformanceAlert(schoolId, id);
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
