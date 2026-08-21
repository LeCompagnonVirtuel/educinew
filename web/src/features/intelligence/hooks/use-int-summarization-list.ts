'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntSummarizationService } from '../services/int-summarization.service';
import { createClient } from '@/lib/supabase/client';
import type { TextSummarization } from '@educi/types';

export const useIntSummarizationList = (schoolId: string) => {
  const [items, setItems] = useState<TextSummarization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntSummarizationService(supabase);
      const data = await service.listSummarizations(schoolId);
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