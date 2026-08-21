'use client';

import { useState, useCallback } from 'react';
import { AdaptiveBurnoutService } from '../services/adaptive-burnout.service';
import { createClient } from '@/lib/supabase/client';
import type { BurnoutDetection, BurnoutDetectionCreate } from '@educi/types';

export const useAdaptiveBurnoutActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: BurnoutDetectionCreate): Promise<BurnoutDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBurnoutService(supabase);
      return await service.createBurnoutDetection(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<BurnoutDetectionCreate>): Promise<BurnoutDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBurnoutService(supabase);
      return await service.updateBurnoutDetection(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBurnoutService(supabase);
      await service.deleteBurnoutDetection(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};
