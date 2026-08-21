'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveKnowledgeHeatmapService } from '../services/adaptive-knowledge-heatmap.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeHeatmap } from '@educi/types';

export const useAdaptiveKnowledgeHeatmapList = (schoolId: string) => {
  const [items, setItems] = useState<KnowledgeHeatmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveKnowledgeHeatmapService(supabase);
      const data = await service.listHeatmaps(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
