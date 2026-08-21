'use client';

import { useState, useCallback } from 'react';
import { EntAPIUsageService } from '../services/api-usage.service';
import { createClient } from '@/lib/supabase/client';
import type { APIUsage, APIUsageCreate } from '@educi/types';

export const useEntAPIUsageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIUsageCreate): Promise<APIUsage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIUsageService(supabase);
      return await service.createAPIUsage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIUsageCreate>): Promise<APIUsage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIUsageService(supabase);
      return await service.updateAPIUsage(schoolId, id, data);
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
      const service = new EntAPIUsageService(supabase);
      await service.deleteAPIUsage(schoolId, id);
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
