'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { LanguageAssessment } from '@educi/types';

export function useGEGINLanguageAssessmentList(schoolId: string) {
  const [data, setData] = useState<LanguageAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    if (!schoolId) return;
    setLoading(true);
    setError(null);
    try {
      const { data: rows, err } = await supabase
        .from('gegin_entities')
        .select('*')
        .eq('school_id', schoolId)
        .eq('type', 'mobility')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setData((rows ?? []) as unknown as LanguageAssessment[]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [schoolId, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refresh: fetchData };
}
