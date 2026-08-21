'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntRecommendationService } from '../services/int-recommendation.service';
import { createClient } from '@/lib/supabase/client';
import type { Recommendation } from '@educi/types';

export const useIntRecommendationList = (schoolId: string) => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntRecommendationService(supabase);
      const data = await service.listRecommendations(schoolId);
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
