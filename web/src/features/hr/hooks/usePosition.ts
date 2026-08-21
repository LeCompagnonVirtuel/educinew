import { useState, useEffect, useCallback } from 'react';
import { createPositionService } from '../services/position.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Position } from '../types';

export function usePositions(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createPositionService(repo);
  const [data, setData] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPositions(schoolId);
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

export function usePosition(supabase: any, schoolId: string, positionId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createPositionService(repo);
  const [data, setData] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!positionId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPositionById(schoolId, positionId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, positionId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
