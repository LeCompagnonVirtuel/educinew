'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FundDisbursement } from '@educi/types';

export function useGOVFundDisbursementList(schoolId: string) {
  const [data, setData] = useState<FundDisbursement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error: err } = await supabase.from('gov_fund_disbursements').select('*').eq('school_id', schoolId);
    if (err) setError(err.message);
    else setData(result as FundDisbursement[]);
    setLoading(false);
  }, [schoolId]);
  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refresh: fetchData };
}
