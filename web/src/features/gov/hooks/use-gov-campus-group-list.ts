'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CampusGroup } from '@educi/types';

export function useGOVCampusGroupList(schoolId: string) {
  const [data, setData] = useState<CampusGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_campus_groups').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as CampusGroup[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
