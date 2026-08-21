'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AiRecommendation } from '@educi/types';

export function useGewlpAiRecommendations(schoolId: string) {
  const [data, setData] = useState<AiRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: recommendations, error: queryError } = await supabase
        .from('gewlp_ai_recommendations')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(recommendations ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load AI recommendations');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
