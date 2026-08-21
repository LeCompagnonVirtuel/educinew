'use client';

import { useState, useCallback } from 'react';
import { EduOSDependencyNodeService } from '../services/eduos-dependency-node.service';
import { createClient } from '@/lib/supabase/client';
import type { DependencyNode } from '@educi/types';

export const useEduOSDependencyNodeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DependencyNode>): Promise<DependencyNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyNodeService(supabase);
      return await service.createDependencyNode(schoolId, data as DependencyNode);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DependencyNode>): Promise<DependencyNode | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDependencyNodeService(supabase);
      return await service.updateDependencyNode(schoolId, id, data);
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
      const service = new EduOSDependencyNodeService(supabase);
      await service.deleteDependencyNode(schoolId, id);
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
