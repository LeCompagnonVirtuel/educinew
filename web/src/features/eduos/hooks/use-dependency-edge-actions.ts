'use client';

import { useState, useCallback } from 'react';
import { EduOSDependencyEdgeService } from '../services/eduos-dependency-edge.service';
import { createClient } from '@/lib/supabase/client';
import type { DependencyEdge } from '@educi/types';

export const useEduOSDependencyEdgeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DependencyEdge>): Promise<DependencyEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyEdgeService(supabase);
      return await service.createDependencyEdge(schoolId, data as DependencyEdge);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DependencyEdge>): Promise<DependencyEdge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyEdgeService(supabase);
      return await service.updateDependencyEdge(schoolId, id, data);
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
      const service = new EduOSDependencyEdgeService(supabase);
      await service.deleteDependencyEdge(schoolId, id);
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
