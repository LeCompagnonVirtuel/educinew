'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveErrorAnalysisService } from '../services/adaptive-error-analysis.service';
import { createClient } from '@/lib/supabase/client';
import type { ErrorAnalysis } from '@educi/types';

export const useAdaptiveErrorAnalysisList = (schoolId: string) => {
  const [items, setItems] = useState<ErrorAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveErrorAnalysisService(supabase);
      const data = await service.listErrorAnalyses(schoolId);
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
