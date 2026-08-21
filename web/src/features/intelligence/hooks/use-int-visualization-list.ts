'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntVisualizationService } from '../services/int-visualization.service';
import { createClient } from '@/lib/supabase/client';
import type { Visualization } from '@educi/types';

export const useIntVisualizationList = (schoolId: string) => {
  const [items, setItems] = useState<Visualization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntVisualizationService(supabase);
      const data = await service.listVisualizations(schoolId);
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