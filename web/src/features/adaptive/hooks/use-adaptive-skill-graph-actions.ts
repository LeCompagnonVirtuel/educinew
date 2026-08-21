'use client';

import { useState, useCallback } from 'react';
import { AdaptiveSkillGraphService } from '../services/adaptive-skill-graph.service';
import { createClient } from '@/lib/supabase/client';
import type { SkillGraph, SkillGraphCreate } from '@educi/types';

export const useAdaptiveSkillGraphActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SkillGraphCreate): Promise<SkillGraph | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSkillGraphService(supabase);
      return await service.createSkillGraph(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SkillGraphCreate>): Promise<SkillGraph | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSkillGraphService(supabase);
      return await service.updateSkillGraph(schoolId, id, data as any);
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
      const service = new AdaptiveSkillGraphService(supabase);
      await service.deleteSkillGraph(schoolId, id);
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
