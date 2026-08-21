'use client';

import { useState, useCallback } from 'react';
import { EntRequestQueueService } from '../services/request-queue.service';
import { createClient } from '@/lib/supabase/client';
import type { RequestQueue, RequestQueueCreate } from '@educi/types';

export const useEntRequestQueueActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: RequestQueueCreate): Promise<RequestQueue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntRequestQueueService(supabase);
      return await service.createRequestQueue(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RequestQueueCreate>): Promise<RequestQueue | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntRequestQueueService(supabase);
      return await service.updateRequestQueue(schoolId, id, data);
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
      const service = new EntRequestQueueService(supabase);
      await service.deleteRequestQueue(schoolId, id);
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
