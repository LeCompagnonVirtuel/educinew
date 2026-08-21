import { useState, useEffect, useCallback } from 'react';
import { createCertificationService } from '../services/certification.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Certification } from '../types';

export function useCertifications(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createCertificationService(repo);
  const [data, setData] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findCertifications(schoolId);
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

export function useCertification(supabase: any, schoolId: string, certificationId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createCertificationService(repo);
  const [data, setData] = useState<Certification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!certificationId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findCertificationById(schoolId, certificationId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, certificationId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
