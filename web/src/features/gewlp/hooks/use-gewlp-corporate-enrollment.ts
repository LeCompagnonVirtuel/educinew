'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CorporateEnrollment } from '@educi/types';

export function useGewlpCorporateEnrollments(schoolId: string) {
  const [data, setData] = useState<CorporateEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: enrollments, error: queryError } = await supabase
        .from('gewlp_corporate_enrollments')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });
      if (queryError) throw queryError;
      setData(enrollments ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load corporate enrollments');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
