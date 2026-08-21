'use client';

import { useState, useCallback } from 'react';
import { EntTraceDependencyService } from '../services/trace-dependency.service';
import { createClient } from '@/lib/supabase/client';
import type { TraceDependency, TraceDependencyCreate } from '@educi/types';

export const useEntTraceDependencyActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TraceDependencyCreate): Promise<TraceDependency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceDependencyService(supabase);
      return await service.createTraceDependency(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TraceDependencyCreate>): Promise<TraceDependency | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTraceDependencyService(supabase);
      return await service.updateTraceDependency(schoolId, id, data);
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
      const service = new EntTraceDependencyService(supabase);
      await service.deleteTraceDependency(schoolId, id);
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
