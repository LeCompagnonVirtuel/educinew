'use client';

import { useState, useCallback } from 'react';
import { EntPipelineNotificationService } from '../services/pipeline-notification.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineNotification, PipelineNotificationCreate } from '@educi/types';

export const useEntPipelineNotificationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PipelineNotificationCreate): Promise<PipelineNotification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineNotificationService(supabase);
      return await service.createPipelineNotification(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PipelineNotificationCreate>): Promise<PipelineNotification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPipelineNotificationService(supabase);
      return await service.updatePipelineNotification(schoolId, id, data);
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
      const service = new EntPipelineNotificationService(supabase);
      await service.deletePipelineNotification(schoolId, id);
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
