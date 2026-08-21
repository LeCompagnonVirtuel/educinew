'use client';

import { useState, useCallback } from 'react';
import { IntEngineService } from '../services/int-engine.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceEngine, IntelligenceEngineCreate } from '@educi/types';

export const useIntEngineActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceEngineCreate): Promise<IntelligenceEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntEngineService(supabase);
      return await service.createEngine(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceEngineCreate>): Promise<IntelligenceEngine | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntEngineService(supabase);
      return await service.updateEngine(schoolId, id, data);
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
      const service = new IntEngineService(supabase);
      await service.deleteEngine(schoolId, id);
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
