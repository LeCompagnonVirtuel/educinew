'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CareerMilestone } from '@educi/types';

export function useGewlpCareerMilestones(schoolId: string) {
  const [data, setData] = useState<CareerMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: milestones, error: queryError } = await supabase
        .from('gewlp_career_milestones')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(milestones ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load career milestones');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
