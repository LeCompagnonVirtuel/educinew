'use client';
import { useState, useCallback } from 'react';
import { ScEnergySavingService } from '../services/sc-energy-saving.service';
import { createClient } from '@/lib/supabase/client';
import type { EnergySaving } from '@educi/types';

export const useScEnergySaving = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSavings = useCallback(async (savingId: string): Promise<EnergySaving | null> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEnergySavingService(createClient());
      return await service.getSaving(schoolId, savingId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getTrends = useCallback(async (): Promise<EnergySaving[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEnergySavingService(createClient());
      return await service.listSavings(schoolId);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getGoals = useCallback(async (): Promise<EnergySaving[]> => {
    try {
      setLoading(true);
      setError(null);
      const service = new ScEnergySavingService(createClient());
      return await service.listSavings(schoolId, { type: 'goal' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, getSavings, getTrends, getGoals };
};
