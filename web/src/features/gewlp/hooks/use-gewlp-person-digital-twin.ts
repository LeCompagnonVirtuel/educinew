'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PersonDigitalTwin } from '@educi/types';

export function useGewlpPersonDigitalTwins(schoolId: string) {
  const [data, setData] = useState<PersonDigitalTwin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: twins, error: queryError } = await supabase
        .from('gewlp_person_digital_twins')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(twins ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load person digital twins');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
