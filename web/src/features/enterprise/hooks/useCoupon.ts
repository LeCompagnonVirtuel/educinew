import { useState, useEffect, useCallback } from 'react';
import { createCouponService } from '../services/coupon.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseCoupon } from '../types';

export function useCoupon(supabase: any, schoolId: string, couponId: string | null) {
  const repo = createEnterpriseRepository(supabase);
  const service = createCouponService(repo);
  const [data, setData] = useState<EnterpriseCoupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!couponId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const result = await service.findCouponById(schoolId, couponId);
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [schoolId, couponId]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
