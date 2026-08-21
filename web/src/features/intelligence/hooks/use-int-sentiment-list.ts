'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntSentimentService } from '../services/int-sentiment.service';
import { createClient } from '@/lib/supabase/client';
import type { SentimentAnalysis } from '@educi/types';

export const useIntSentimentList = (schoolId: string) => {
  const [items, setItems] = useState<SentimentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSentimentService(supabase);
      const data = await service.listSentimentAnalyses(schoolId);
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