'use client';

import { useState, useCallback } from 'react';
import { EntSchedulerConfigService } from '../services/scheduler-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SchedulerConfig, SchedulerConfigCreate } from '@educi/types';

export const useEntSchedulerConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SchedulerConfigCreate): Promise<SchedulerConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSchedulerConfigService(supabase);
      return await service.createSchedulerConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SchedulerConfigCreate>): Promise<SchedulerConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSchedulerConfigService(supabase);
      return await service.updateSchedulerConfig(schoolId, id, data);
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
      const service = new EntSchedulerConfigService(supabase);
      await service.deleteSchedulerConfig(schoolId, id);
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
