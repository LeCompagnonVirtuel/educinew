'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ScholarshipFund } from '@educi/types';

export function useGewlpScholarshipFunds(schoolId: string) {
  const [data, setData] = useState<ScholarshipFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: funds, error: queryError } = await supabase
        .from('gewlp_scholarship_funds')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(funds ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scholarship funds');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
