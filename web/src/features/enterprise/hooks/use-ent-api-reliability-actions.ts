'use client';

import { useState, useCallback } from 'react';
import { EntAPIReliabilityService } from '../services/api-reliability.service';
import { createClient } from '@/lib/supabase/client';
import type { APIReliability, APIReliabilityCreate } from '@educi/types';

export const useEntAPIReliabilityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIReliabilityCreate): Promise<APIReliability | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIReliabilityService(supabase);
      return await service.createAPIReliability(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIReliabilityCreate>): Promise<APIReliability | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIReliabilityService(supabase);
      return await service.updateAPIReliability(schoolId, id, data);
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
      const service = new EntAPIReliabilityService(supabase);
      await service.deleteAPIReliability(schoolId, id);
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
