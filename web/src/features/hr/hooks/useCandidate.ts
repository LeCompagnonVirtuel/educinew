import { useState, useEffect, useCallback } from 'react';
import { createCandidateService } from '../services/candidate.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Candidate } from '../types';

export function useCandidates(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createCandidateService(repo);
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findCandidates(schoolId);
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

export function useCandidate(supabase: any, schoolId: string, candidateId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createCandidateService(repo);
  const [data, setData] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!candidateId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findCandidateById(schoolId, candidateId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, candidateId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
