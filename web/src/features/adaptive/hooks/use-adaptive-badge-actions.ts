'use client';

import { useState, useCallback } from 'react';
import { AdaptiveBadgeService } from '../services/adaptive-badge.service';
import { createClient } from '@/lib/supabase/client';
import type { Badge } from '@educi/types';

export const useAdaptiveBadgeActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<Badge, 'id' | 'created_at'>): Promise<Badge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBadgeService(supabase);
      return await service.createBadge(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<Badge, 'id' | 'created_at'>>): Promise<Badge | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveBadgeService(supabase);
      return await service.updateBadge(schoolId, id, data);
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
      const service = new AdaptiveBadgeService(supabase);
      await service.deleteBadge(schoolId, id);
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
