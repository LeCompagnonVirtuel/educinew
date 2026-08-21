'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveCompetencyService } from '../services/adaptive-competency.service';
import { createClient } from '@/lib/supabase/client';
import type { Competency } from '@educi/types';

export const useAdaptiveCompetencyList = (schoolId: string) => {
  const [items, setItems] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCompetencyService(supabase);
      const data = await service.listCompetencies(schoolId);
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
