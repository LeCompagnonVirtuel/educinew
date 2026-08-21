'use client';

import { useState, useCallback } from 'react';
import { EntPlatformInsightService } from '../services/platform-insight.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformInsight, PlatformInsightCreate } from '@educi/types';

export const useEntPlatformInsightActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformInsightCreate): Promise<PlatformInsight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformInsightService(supabase);
      return await service.createPlatformInsight(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformInsightCreate>): Promise<PlatformInsight | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformInsightService(supabase);
      return await service.updatePlatformInsight(schoolId, id, data);
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
      const service = new EntPlatformInsightService(supabase);
      await service.deletePlatformInsight(schoolId, id);
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
