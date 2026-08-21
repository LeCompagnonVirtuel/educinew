'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntInsightService } from '../services/int-insight.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceInsight } from '@educi/types';

export const useIntInsightList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntInsightService(supabase);
      const data = await service.listInsights(schoolId);
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
