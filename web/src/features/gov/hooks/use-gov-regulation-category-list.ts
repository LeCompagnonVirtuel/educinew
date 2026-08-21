'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RegulationCategory } from '@educi/types';

export function useGOVRegulationCategoryList(schoolId: string) {
  const [data, setData] = useState<RegulationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_regulation_categories').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as RegulationCategory[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
