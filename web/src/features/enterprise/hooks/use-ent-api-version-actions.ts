'use client';

import { useState, useCallback } from 'react';
import { EntAPIVersionService } from '../services/api-version.service';
import { createClient } from '@/lib/supabase/client';
import type { APIVersion, APIVersionCreate } from '@educi/types';

export const useEntAPIVersionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIVersionCreate): Promise<APIVersion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIVersionService(supabase);
      return await service.createAPIVersion(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIVersionCreate>): Promise<APIVersion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIVersionService(supabase);
      return await service.updateAPIVersion(schoolId, id, data);
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
      const service = new EntAPIVersionService(supabase);
      await service.deleteAPIVersion(schoolId, id);
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
