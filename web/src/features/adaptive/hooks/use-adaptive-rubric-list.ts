'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveRubricService } from '../services/adaptive-rubric.service';
import { createClient } from '@/lib/supabase/client';
import type { Rubric } from '@educi/types';

export const useAdaptiveRubricList = (schoolId: string) => {
  const [items, setItems] = useState<Rubric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRubricService(supabase);
      const data = await service.listRubrics(schoolId);
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
