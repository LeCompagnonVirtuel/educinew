'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { WorkforceForecast } from '@educi/types';

export function useGewlpWorkforceForecasts(schoolId: string) {
  const [data, setData] = useState<WorkforceForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: forecasts, error: queryError } = await supabase
        .from('gewlp_workforce_forecasts')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(forecasts ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workforce forecasts');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
