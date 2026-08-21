'use client';

import { useState, useCallback } from 'react';
import { EntPlatformEngagementService } from '../services/platform-engagement.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformEngagement, PlatformEngagementCreate } from '@educi/types';

export const useEntPlatformEngagementActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformEngagementCreate): Promise<PlatformEngagement | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformEngagementService(supabase);
      return await service.createPlatformEngagement(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformEngagementCreate>): Promise<PlatformEngagement | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformEngagementService(supabase);
      return await service.updatePlatformEngagement(schoolId, id, data);
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
      const service = new EntPlatformEngagementService(supabase);
      await service.deletePlatformEngagement(schoolId, id);
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
