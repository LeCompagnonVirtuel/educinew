import { useState, useEffect, useCallback } from 'react';
import { createHRRepository } from '../repositories/hr.repository';
import type { Benefit } from '../types';

export function useBenefits(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findBenefits(schoolId);
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

export function useBenefit(supabase: any, schoolId: string, benefitId: string | null) {
  const repo = createHRRepository(supabase);
  const [data, setData] = useState<Benefit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!benefitId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await repo.findBenefitById(schoolId, benefitId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, benefitId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
