import { useState, useEffect, useCallback } from 'react';
import { createInterviewService } from '../services/interview.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Interview } from '../types';

export function useInterviews(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createInterviewService(repo);
  const [data, setData] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findInterviews(schoolId);
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

export function useInterview(supabase: any, schoolId: string, interviewId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createInterviewService(repo);
  const [data, setData] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!interviewId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findInterviewById(schoolId, interviewId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, interviewId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
