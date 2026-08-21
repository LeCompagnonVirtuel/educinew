'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CampusGroupMember } from '@educi/types';

export function useGOVCampusGroupMemberList(schoolId: string) {
  const [data, setData] = useState<CampusGroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_campus_group_members').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as CampusGroupMember[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
