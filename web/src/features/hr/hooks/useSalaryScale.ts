import { useState, useEffect, useCallback } from 'react';
import { createHRRepository } from '../repositories/hr.repository';
import type { SalaryScale } from '../types';

export function useSalaryScales(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<SalaryScale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findSalaryScales(schoolId);
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

export function useSalaryScale(supabase: any, schoolId: string, scaleId: string | null) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<SalaryScale | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!scaleId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findSalaryScaleById(schoolId, scaleId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, scaleId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
