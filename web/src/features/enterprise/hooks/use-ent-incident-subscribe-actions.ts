'use client';

import { useState, useCallback } from 'react';
import { EntIncidentSubscribeService } from '../services/incident-subscribe.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentSubscribe, IncidentSubscribeCreate } from '@educi/types';

export const useEntIncidentSubscribeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IncidentSubscribeCreate): Promise<IncidentSubscribe | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentSubscribeService(supabase);
      return await service.createIncidentSubscribe(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IncidentSubscribeCreate>): Promise<IncidentSubscribe | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentSubscribeService(supabase);
      return await service.updateIncidentSubscribe(schoolId, id, data);
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
      const service = new EntIncidentSubscribeService(supabase);
      await service.deleteIncidentSubscribe(schoolId, id);
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
