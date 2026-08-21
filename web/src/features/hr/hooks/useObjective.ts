import { useState, useEffect, useCallback } from 'react';
import { createObjectiveService } from '../services/objective.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Objective } from '../types';

export function useObjectives(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createObjectiveService(repo);
  const [data, setData] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findObjectives(schoolId);
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

export function useObjective(supabase: any, schoolId: string, objectiveId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createObjectiveService(repo);
  const [data, setData] = useState<Objective | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!objectiveId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findObjectiveById(schoolId, objectiveId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, objectiveId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
