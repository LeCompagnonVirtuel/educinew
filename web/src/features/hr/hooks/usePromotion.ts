import { useState, useEffect, useCallback } from 'react';
import { createPromotionService } from '../services/promotion.service';
import { createHRRepository } from '../repositories/hr.repository';
import type { Promotion } from '../types';

export function usePromotions(supabase: any, schoolId: string) {
  const repo = createHRRepository(supabase);
  const service = createPromotionService(repo);
  const [data, setData] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPromotions(schoolId);
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

export function usePromotion(supabase: any, schoolId: string, promotionId: string | null) {
  const repo = createHRRepository(supabase);
  const service = createPromotionService(repo);
  const [data, setData] = useState<Promotion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!promotionId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findPromotionById(schoolId, promotionId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, promotionId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
