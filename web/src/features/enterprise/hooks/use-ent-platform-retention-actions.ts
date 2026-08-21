'use client';

import { useState, useCallback } from 'react';
import { EntPlatformRetentionService } from '../services/platform-retention.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformRetention, PlatformRetentionCreate } from '@educi/types';

export const useEntPlatformRetentionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformRetentionCreate): Promise<PlatformRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformRetentionService(supabase);
      return await service.createPlatformRetention(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformRetentionCreate>): Promise<PlatformRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformRetentionService(supabase);
      return await service.updatePlatformRetention(schoolId, id, data);
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
      const service = new EntPlatformRetentionService(supabase);
      await service.deletePlatformRetention(schoolId, id);
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
