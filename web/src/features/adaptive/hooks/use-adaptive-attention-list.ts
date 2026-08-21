'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveAttentionService } from '../services/adaptive-attention.service';
import { createClient } from '@/lib/supabase/client';
import type { AttentionScore } from '@educi/types';

export const useAdaptiveAttentionList = (schoolId: string) => {
  const [items, setItems] = useState<AttentionScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAttentionService(supabase);
      const data = await service.listAttentionScores(schoolId);
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
