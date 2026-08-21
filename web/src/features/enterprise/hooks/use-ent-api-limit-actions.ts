'use client';

import { useState, useCallback } from 'react';
import { EntAPILimitService } from '../services/api-limit.service';
import { createClient } from '@/lib/supabase/client';
import type { APILimit, APILimitCreate } from '@educi/types';

export const useEntAPILimitActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APILimitCreate): Promise<APILimit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPILimitService(supabase);
      return await service.createAPILimit(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APILimitCreate>): Promise<APILimit | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPILimitService(supabase);
      return await service.updateAPILimit(schoolId, id, data);
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
      const service = new EntAPILimitService(supabase);
      await service.deleteAPILimit(schoolId, id);
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
