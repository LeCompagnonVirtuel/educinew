'use client';

import { useState, useCallback } from 'react';
import { IntApiService } from '../services/int-api.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceAPI, IntelligenceAPICreate } from '@educi/types';

export const useIntApiActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceAPICreate): Promise<IntelligenceAPI | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntApiService(supabase);
      return await service.createAPI(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceAPICreate>): Promise<IntelligenceAPI | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntApiService(supabase);
      return await service.updateAPI(schoolId, id, data);
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
      const service = new IntApiService(supabase);
      await service.deleteAPI(schoolId, id);
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