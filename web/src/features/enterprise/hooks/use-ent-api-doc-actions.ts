'use client';

import { useState, useCallback } from 'react';
import { EntAPIDocService } from '../services/api-doc.service';
import { createClient } from '@/lib/supabase/client';
import type { APIDoc, APIDocCreate } from '@educi/types';

export const useEntAPIDocActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIDocCreate): Promise<APIDoc | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIDocService(supabase);
      return await service.createAPIDoc(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIDocCreate>): Promise<APIDoc | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIDocService(supabase);
      return await service.updateAPIDoc(schoolId, id, data);
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
      const service = new EntAPIDocService(supabase);
      await service.deleteAPIDoc(schoolId, id);
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
