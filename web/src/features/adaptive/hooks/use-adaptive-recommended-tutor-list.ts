'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveRecommendedTutorService } from '../services/adaptive-recommended-tutor.service';
import { createClient } from '@/lib/supabase/client';
import type { RecommendedTutor } from '@educi/types';

export const useAdaptiveRecommendedTutorList = (schoolId: string) => {
  const [items, setItems] = useState<RecommendedTutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRecommendedTutorService(supabase);
      const data = await service.listTutors(schoolId);
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
