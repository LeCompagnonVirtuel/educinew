'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { GraduateTracking } from '@educi/types';

export function useGewlpGraduateTrackings(schoolId: string) {
  const [data, setData] = useState<GraduateTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: trackings, error: queryError } = await supabase
        .from('gewlp_graduate_trackings')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(trackings ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load graduate trackings');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
