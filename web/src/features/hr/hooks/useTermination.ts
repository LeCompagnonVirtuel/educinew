import { useState, useEffect, useCallback } from 'react';
import { createTerminationService } from '../services/termination.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Termination } from '../types';

export function useTerminations(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createTerminationService(repo);
  const [data, setData] = useState<Termination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTerminations(schoolId);
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

export function useTermination(supabase: any, schoolId: string, terminationId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createTerminationService(repo);
  const [data, setData] = useState<Termination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!terminationId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTerminationById(schoolId, terminationId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, terminationId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
