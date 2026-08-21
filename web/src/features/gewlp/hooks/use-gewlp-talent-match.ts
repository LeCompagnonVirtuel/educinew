'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TalentMatch } from '@educi/types';

export function useGewlpTalentMatches(schoolId: string) {
  const [data, setData] = useState<TalentMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: matches, error: queryError } = await supabase
        .from('gewlp_talent_matches')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(matches ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load talent matches');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
