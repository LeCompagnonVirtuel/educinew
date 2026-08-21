import { useState, useEffect, useCallback } from 'react';
import { createRecruitmentService } from '../services/recruitment.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Recruitment } from '../types';

export function useRecruitments(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createRecruitmentService(repo);
  const [data, setData] = useState<Recruitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findRecruitments(schoolId);
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

export function useRecruitment(supabase: any, schoolId: string, recruitmentId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createRecruitmentService(repo);
  const [data, setData] = useState<Recruitment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!recruitmentId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findRecruitmentById(schoolId, recruitmentId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, recruitmentId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
