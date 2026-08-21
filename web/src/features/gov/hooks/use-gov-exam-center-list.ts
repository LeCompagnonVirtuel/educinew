'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ExamCenter } from '@educi/types';

export function useGOVExamCenterList(schoolId: string) {
  const [data, setData] = useState<ExamCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_exam_centers').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as ExamCenter[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
