'use client';

import { useState, useCallback } from 'react';
import { EntLogRotationService } from '../services/log-rotation.service';
import { createClient } from '@/lib/supabase/client';
import type { LogRotation, LogRotationCreate } from '@educi/types';

export const useEntLogRotationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogRotationCreate): Promise<LogRotation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogRotationService(supabase);
      return await service.createLogRotation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogRotationCreate>): Promise<LogRotation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogRotationService(supabase);
      return await service.updateLogRotation(schoolId, id, data);
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
      const service = new EntLogRotationService(supabase);
      await service.deleteLogRotation(schoolId, id);
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
