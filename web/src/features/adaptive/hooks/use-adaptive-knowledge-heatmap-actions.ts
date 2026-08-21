'use client';

import { useState, useCallback } from 'react';
import { AdaptiveKnowledgeHeatmapService } from '../services/adaptive-knowledge-heatmap.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeHeatmap, KnowledgeHeatmapCreate } from '@educi/types';

export const useAdaptiveKnowledgeHeatmapActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: KnowledgeHeatmapCreate): Promise<KnowledgeHeatmap | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveKnowledgeHeatmapService(supabase);
      return await service.createHeatmap(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<KnowledgeHeatmapCreate>): Promise<KnowledgeHeatmap | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveKnowledgeHeatmapService(supabase);
      return await service.updateHeatmap(schoolId, id, data);
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
      const service = new AdaptiveKnowledgeHeatmapService(supabase);
      await service.deleteHeatmap(schoolId, id);
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
