'use client';
import { useState, useEffect, useCallback } from 'react';
import { ScEnergySavingService } from '../services/sc-energy-saving.service';
import { createClient } from '@/lib/supabase/client';
import type { EnergySaving } from '@educi/types';

export const useScEnergySavingList = (schoolId: string) => {
  const [savings, setSavings] = useState<EnergySaving[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavings = useCallback(async () => {
    try {
      setLoading(true);
      const service = new ScEnergySavingService(createClient());
      const data = await service.listSavings(schoolId);
      setSavings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  return { savings, loading, error, refresh: fetchSavings };
};
