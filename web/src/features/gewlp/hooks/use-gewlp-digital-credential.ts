'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { DigitalCredential } from '@educi/types';

export function useGewlpDigitalCredentials(schoolId: string) {
  const [data, setData] = useState<DigitalCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: credentials, error: queryError } = await supabase
        .from('gewlp_digital_credentials')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(credentials ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load digital credentials');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
