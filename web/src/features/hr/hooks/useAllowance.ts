import { useState, useEffect, useCallback } from 'react';
import { createHRRepository } from '../repositories/hr.repository';
import type { Allowance } from '../types';

export function useAllowances(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<Allowance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findAllowances(schoolId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useAllowance(supabase: any, schoolId: string, allowanceId: string | null) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<Allowance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!allowanceId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findAllowanceById(schoolId, allowanceId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, allowanceId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
