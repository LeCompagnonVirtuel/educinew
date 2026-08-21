'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { InspectorPerformance } from '@educi/types';

export function useGOVInspectorPerformanceList(schoolId: string) {
  const [data, setData] = useState<InspectorPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_inspector_performances').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as InspectorPerformance[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
