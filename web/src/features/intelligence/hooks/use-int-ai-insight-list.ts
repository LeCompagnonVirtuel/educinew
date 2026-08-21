'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntAiInsightService } from '../services/int-ai-insight.service';
import { createClient } from '@/lib/supabase/client';
import type { AIInsight } from '@educi/types';

export const useIntAiInsightList = (schoolId: string) => {
  const [items, setItems] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntAiInsightService(supabase);
      const data = await service.listAIInsights(schoolId);
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