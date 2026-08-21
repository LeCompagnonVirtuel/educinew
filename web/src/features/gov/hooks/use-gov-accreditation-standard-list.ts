'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { AccreditationStandard } from '@educi/types';

export function useGOVAccreditationStandardList(schoolId: string) {
  const [data, setData] = useState<AccreditationStandard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_accreditation_standards').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as AccreditationStandard[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
