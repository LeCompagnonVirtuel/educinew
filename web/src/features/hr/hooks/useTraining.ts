import { useState, useEffect, useCallback } from 'react';
import { createTrainingService } from '../services/training.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Training } from '../types';

export function useTrainings(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createTrainingService(repo);
  const [data, setData] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTrainings(schoolId);
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

export function useTraining(supabase: any, schoolId: string, trainingId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createTrainingService(repo);
  const [data, setData] = useState<Training | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!trainingId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findTrainingById(schoolId, trainingId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, trainingId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
