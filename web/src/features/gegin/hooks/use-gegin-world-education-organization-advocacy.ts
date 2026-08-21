'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { WorldEducationOrganizationAdvocacy } from '@educi/types';

export function useGEGINWorldEducationOrganizationAdvocacyList(schoolId: string) {
  const [data, setData] = useState<WorldEducationOrganizationAdvocacy[]>([]);
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
        .eq('type', 'organizations')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setData((rows ?? []) as unknown as WorldEducationOrganizationAdvocacy[]);
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
