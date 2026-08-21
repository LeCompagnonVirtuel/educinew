'use client';

import { useState, useCallback } from 'react';
import { AdaptiveStrengthService } from '../services/adaptive-strength.service';
import { createClient } from '@/lib/supabase/client';
import type { StrengthDetection, StrengthDetectionCreate } from '@educi/types';

export const useAdaptiveStrengthActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: StrengthDetectionCreate): Promise<StrengthDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveStrengthService(supabase);
      return await service.createStrengthDetection(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StrengthDetectionCreate>): Promise<StrengthDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveStrengthService(supabase);
      return await service.updateStrengthDetection(schoolId, id, data as any);
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
      const service = new AdaptiveStrengthService(supabase);
      await service.deleteStrengthDetection(schoolId, id);
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
