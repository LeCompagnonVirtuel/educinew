'use client';

import { useState, useCallback } from 'react';
import { EntEventBusService } from '../services/event-bus.service';
import { createClient } from '@/lib/supabase/client';
import type { EventBus, EventBusCreate } from '@educi/types';

export const useEntEventBusActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EventBusCreate): Promise<EventBus | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntEventBusService(supabase);
      return await service.createEventBus(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EventBusCreate>): Promise<EventBus | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntEventBusService(supabase);
      return await service.updateEventBus(schoolId, id, data);
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
      const service = new EntEventBusService(supabase);
      await service.deleteEventBus(schoolId, id);
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
