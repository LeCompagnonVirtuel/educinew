'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SchoolComplianceRecord } from '@educi/types';

export function useGOVSchoolComplianceRecordList(schoolId: string) {
  const [data, setData] = useState<SchoolComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_school_compliance_records').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as SchoolComplianceRecord[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
