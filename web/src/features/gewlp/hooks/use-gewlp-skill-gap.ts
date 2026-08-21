'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SkillGap } from '@educi/types';

export function useGewlpSkillGaps(schoolId: string) {
  const [data, setData] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: gaps, error: queryError } = await supabase
        .from('gewlp_skill_gaps')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(gaps ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load skill gaps');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
