'use client';

import { useState, useCallback } from 'react';
import { EntLogTransportService } from '../services/log-transport.service';
import { createClient } from '@/lib/supabase/client';
import type { LogTransport, LogTransportCreate } from '@educi/types';

export const useEntLogTransportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogTransportCreate): Promise<LogTransport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogTransportService(supabase);
      return await service.createLogTransport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogTransportCreate>): Promise<LogTransport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogTransportService(supabase);
      return await service.updateLogTransport(schoolId, id, data);
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
      const service = new EntLogTransportService(supabase);
      await service.deleteLogTransport(schoolId, id);
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
