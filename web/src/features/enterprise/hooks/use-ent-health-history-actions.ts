'use client';

import { useState, useCallback } from 'react';
import { EntHealthHistoryService } from '../services/health-history.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthHistory, HealthHistoryCreate } from '@educi/types';

export const useEntHealthHistoryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: HealthHistoryCreate): Promise<HealthHistory | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthHistoryService(supabase);
      return await service.createHealthHistory(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<HealthHistoryCreate>): Promise<HealthHistory | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthHistoryService(supabase);
      return await service.updateHealthHistory(schoolId, id, data);
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
      const service = new EntHealthHistoryService(supabase);
      await service.deleteHealthHistory(schoolId, id);
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
