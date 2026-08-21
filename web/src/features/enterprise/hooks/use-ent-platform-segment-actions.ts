'use client';

import { useState, useCallback } from 'react';
import { EntPlatformSegmentService } from '../services/platform-segment.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformSegment, PlatformSegmentCreate } from '@educi/types';

export const useEntPlatformSegmentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformSegmentCreate): Promise<PlatformSegment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformSegmentService(supabase);
      return await service.createPlatformSegment(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformSegmentCreate>): Promise<PlatformSegment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformSegmentService(supabase);
      return await service.updatePlatformSegment(schoolId, id, data);
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
      const service = new EntPlatformSegmentService(supabase);
      await service.deletePlatformSegment(schoolId, id);
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
