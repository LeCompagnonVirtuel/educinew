'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SkillEndorsement } from '@educi/types';

export function useGewlpSkillEndorsements(schoolId: string) {
  const [data, setData] = useState<SkillEndorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: endorsements, error: queryError } = await supabase
        .from('gewlp_skill_endorsements')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(endorsements ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load skill endorsements');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
