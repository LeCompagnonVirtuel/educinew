import { useState, useEffect, useCallback } from 'react';
import { createDisciplinaryService } from '../services/disciplinary.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { DisciplinaryAction } from '../types';

export function useDisciplinaryActions(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createDisciplinaryService(repo);
  const [data, setData] = useState<DisciplinaryAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findDisciplinaryActions(schoolId);
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

export function useDisciplinaryAction(supabase: any, schoolId: string, actionId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createDisciplinaryService(repo);
  const [data, setData] = useState<DisciplinaryAction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!actionId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findDisciplinaryActionById(schoolId, actionId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, actionId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
