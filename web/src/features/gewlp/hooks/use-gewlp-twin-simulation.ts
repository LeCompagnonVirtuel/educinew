'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { TwinSimulation } from '@educi/types';

export function useGewlpTwinSimulations(schoolId: string) {
  const [data, setData] = useState<TwinSimulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: simulations, error: queryError } = await supabase
        .from('gewlp_twin_simulations')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(simulations ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load twin simulations');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
