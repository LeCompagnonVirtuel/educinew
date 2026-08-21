'use client';

import { useState, useCallback } from 'react';
import { AdaptiveKnowledgeMapService } from '../services/adaptive-knowledge-map.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeMap, KnowledgeMapCreate } from '@educi/types';

export const useAdaptiveKnowledgeMapActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: KnowledgeMapCreate): Promise<KnowledgeMap | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveKnowledgeMapService(supabase);
      return await service.createKnowledgeMap(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<KnowledgeMapCreate>): Promise<KnowledgeMap | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveKnowledgeMapService(supabase);
      return await service.updateKnowledgeMap(schoolId, id, data as any);
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
      const service = new AdaptiveKnowledgeMapService(supabase);
      await service.deleteKnowledgeMap(schoolId, id);
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
