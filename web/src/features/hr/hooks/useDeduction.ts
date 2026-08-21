import { useState, useEffect, useCallback } from 'react';
import { createHRRepository } from '../repositories/hr.repository';
import type { Deduction } from '../types';

export function useDeductions(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<Deduction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findDeductions(schoolId);
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

export function useDeduction(supabase: any, schoolId: string, deductionId: string | null) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<Deduction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!deductionId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findDeductionById(schoolId, deductionId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, deductionId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
