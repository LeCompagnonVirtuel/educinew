'use client';

import { useState, useCallback } from 'react';
import { EduOSEventTriggerService } from '../services/eduos-event-trigger.service';
import { createClient } from '@/lib/supabase/client';
import type { EventTrigger } from '@educi/types';

export const useEduOSEventTriggerActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EventTrigger): Promise<EventTrigger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEventTriggerService(supabase);
      return await service.createEventTrigger(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EventTrigger>): Promise<EventTrigger | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEventTriggerService(supabase);
      return await service.updateEventTrigger(schoolId, id, data);
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
      const service = new EduOSEventTriggerService(supabase);
      await service.deleteEventTrigger(schoolId, id);
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