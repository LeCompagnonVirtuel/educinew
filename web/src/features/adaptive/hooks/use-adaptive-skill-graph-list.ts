'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveSkillGraphService } from '../services/adaptive-skill-graph.service';
import { createClient } from '@/lib/supabase/client';
import type { SkillGraph } from '@educi/types';

export const useAdaptiveSkillGraphList = (schoolId: string) => {
  const [items, setItems] = useState<SkillGraph[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveSkillGraphService(supabase);
      const data = await service.listSkillGraphs(schoolId);
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
