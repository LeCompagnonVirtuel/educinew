'use client';

import { useState, useCallback } from 'react';
import { GlobalCloudEventTargetService } from '../services/global-cloud-event-target.service';
import { createClient } from '@/lib/supabase/client';
import type { EventTarget } from '@educi/types';

export const useGlobalCloudEventTargetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<EventTarget>): Promise<EventTarget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEventTargetService(supabase);
      return await service.create(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EventTarget>): Promise<EventTarget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudEventTargetService(supabase);
      return await service.update(schoolId, id, data as any);
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
      const service = new GlobalCloudEventTargetService(supabase);
      await service.delete(schoolId, id);
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