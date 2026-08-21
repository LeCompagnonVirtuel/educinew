import { useState, useEffect, useCallback } from 'react';
import { createPerformanceService } from '../services/performance.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { PerformanceReview } from '../types';

export function usePerformanceReviews(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createPerformanceService(repo);
  const [data, setData] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPerformanceReviews(schoolId);
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

export function usePerformanceReview(supabase: any, schoolId: string, reviewId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createPerformanceService(repo);
  const [data, setData] = useState<PerformanceReview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!reviewId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPerformanceReviewById(schoolId, reviewId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, reviewId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
