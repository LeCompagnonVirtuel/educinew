'use client';

import { useState, useCallback } from 'react';
import { AdaptiveMasteryService } from '../services/adaptive-mastery.service';
import { createClient } from '@/lib/supabase/client';
import type { MasteryTracking, MasteryTrackingCreate } from '@educi/types';

export const useAdaptiveMasteryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MasteryTrackingCreate): Promise<MasteryTracking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMasteryService(supabase);
      return await service.createMasteryTracking(schoolId, data as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MasteryTrackingCreate>): Promise<MasteryTracking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMasteryService(supabase);
      return await service.updateMasteryTracking(schoolId, id, data as any);
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
      const service = new AdaptiveMasteryService(supabase);
      await service.deleteMasteryTracking(schoolId, id);
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
