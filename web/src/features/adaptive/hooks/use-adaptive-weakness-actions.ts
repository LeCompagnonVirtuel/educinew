'use client';

import { useState, useCallback } from 'react';
import { AdaptiveWeaknessService } from '../services/adaptive-weakness.service';
import { createClient } from '@/lib/supabase/client';
import type { WeaknessDetection, WeaknessDetectionCreate } from '@educi/types';

export const useAdaptiveWeaknessActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: WeaknessDetectionCreate): Promise<WeaknessDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveWeaknessService(supabase);
      return await service.createWeaknessDetection(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<WeaknessDetectionCreate>): Promise<WeaknessDetection | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveWeaknessService(supabase);
      return await service.updateWeaknessDetection(schoolId, id, data as any);
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
      const service = new AdaptiveWeaknessService(supabase);
      await service.deleteWeaknessDetection(schoolId, id);
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
