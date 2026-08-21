'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScCCTVService } from '../services/sc-cctv.service';
import { createClient } from '@/lib/supabase/client';
import type { CCTV } from '@educi/types';

export const useScCctvList = (schoolId: string) => {
  const [cctvs, setCctvs] = useState<CCTV[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCctvs = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScCCTVService(createClient());
      const data = await service.listCCTVs(schoolId);
      setCctvs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchCctvs();
  }, [fetchCctvs]);

  return { cctvs, loading, error, refresh: fetchCctvs };
};
