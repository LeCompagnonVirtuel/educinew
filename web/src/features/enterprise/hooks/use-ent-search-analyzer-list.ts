'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchAnalyzerService } from '../services/search-analyzer.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchAnalyzer } from '@educi/types';

export const useEntSearchAnalyzerList = (schoolId: string) => {
  const [items, setItems] = useState<SearchAnalyzer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchAnalyzerService(supabase);
      const data = await service.listSearchAnalyzers(schoolId);
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
