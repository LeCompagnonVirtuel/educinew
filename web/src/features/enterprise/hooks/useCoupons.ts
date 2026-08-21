import { useState, useEffect, useCallback } from 'react';
import { createCouponService } from '../services/coupon.service';
import { createEnterpriseRepository } from '../repositories/enterprise.repository';
import type { EnterpriseCoupon } from '../types';

export function useCoupons(supabase: any, schoolId: string) {
  const repo = createEnterpriseRepository(supabase);
  const service = createCouponService(repo);
  const [data, setData] = useState<EnterpriseCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.findCoupons(schoolId);
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
