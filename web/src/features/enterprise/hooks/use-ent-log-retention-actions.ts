'use client';

import { useState, useCallback } from 'react';
import { EntLogRetentionService } from '../services/log-retention.service';
import { createClient } from '@/lib/supabase/client';
import type { LogRetention, LogRetentionCreate } from '@educi/types';

export const useEntLogRetentionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogRetentionCreate): Promise<LogRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogRetentionService(supabase);
      return await service.createLogRetention(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogRetentionCreate>): Promise<LogRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogRetentionService(supabase);
      return await service.updateLogRetention(schoolId, id, data);
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
      const service = new EntLogRetentionService(supabase);
      await service.deleteLogRetention(schoolId, id);
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
