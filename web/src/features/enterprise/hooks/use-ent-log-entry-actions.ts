'use client';

import { useState, useCallback } from 'react';
import { EntLogEntryService } from '../services/log-entry.service';
import { createClient } from '@/lib/supabase/client';
import type { LogEntry, LogEntryCreate } from '@educi/types';

export const useEntLogEntryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogEntryCreate): Promise<LogEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogEntryService(supabase);
      return await service.createLogEntry(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogEntryCreate>): Promise<LogEntry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogEntryService(supabase);
      return await service.updateLogEntry(schoolId, id, data);
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
      const service = new EntLogEntryService(supabase);
      await service.deleteLogEntry(schoolId, id);
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
