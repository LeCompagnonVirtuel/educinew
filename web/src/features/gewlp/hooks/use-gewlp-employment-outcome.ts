'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { EmploymentOutcome } from '@educi/types';

export function useGewlpEmploymentOutcomes(schoolId: string) {
  const [data, setData] = useState<EmploymentOutcome[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: outcomes, error: queryError } = await supabase
        .from('gewlp_employment_outcomes')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(outcomes ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employment outcomes');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
