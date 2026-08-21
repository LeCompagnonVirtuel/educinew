'use client';

import { useState, useCallback } from 'react';
import { EntLogEnrichmentService } from '../services/log-enrichment.service';
import { createClient } from '@/lib/supabase/client';
import type { LogEnrichment, LogEnrichmentCreate } from '@educi/types';

export const useEntLogEnrichmentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: LogEnrichmentCreate): Promise<LogEnrichment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogEnrichmentService(supabase);
      return await service.createLogEnrichment(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LogEnrichmentCreate>): Promise<LogEnrichment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogEnrichmentService(supabase);
      return await service.updateLogEnrichment(schoolId, id, data);
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
      const service = new EntLogEnrichmentService(supabase);
      await service.deleteLogEnrichment(schoolId, id);
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
