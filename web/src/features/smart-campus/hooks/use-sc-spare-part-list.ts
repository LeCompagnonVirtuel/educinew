'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScSparePartService } from '../services/sc-spare-part.service';
import { createClient } from '@/lib/supabase/client';
import type { SparePart } from '@educi/types';

export const useScSparePartList = (schoolId: string) => {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpareParts = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScSparePartService(createClient());
      const data = await service.listSpareParts(schoolId);
      setSpareParts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSpareParts();
  }, [fetchSpareParts]);

  return { spareParts, loading, error, refresh: fetchSpareParts };
};
