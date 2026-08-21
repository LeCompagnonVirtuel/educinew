'use client';

import { useState, useCallback } from 'react';
import { EduOSDependencyGraphService } from '../services/eduos-dependency-graph.service';
import { createClient } from '@/lib/supabase/client';
import type { DependencyGraph } from '@educi/types';

export const useEduOSDependencyGraphActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DependencyGraph>): Promise<DependencyGraph | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyGraphService(supabase);
      return await service.createDependencyGraph(schoolId, data as DependencyGraph);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DependencyGraph>): Promise<DependencyGraph | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyGraphService(supabase);
      return await service.updateDependencyGraph(schoolId, id, data);
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
      const service = new EduOSDependencyGraphService(supabase);
      await service.deleteDependencyGraph(schoolId, id);
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
