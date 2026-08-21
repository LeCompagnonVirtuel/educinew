'use client';

import { useState, useCallback } from 'react';
import { AdaptiveMemoryService } from '../services/adaptive-memory.service';
import { createClient } from '@/lib/supabase/client';
import type { MemoryRetention, MemoryRetentionCreate } from '@educi/types';

export const useAdaptiveMemoryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MemoryRetentionCreate): Promise<MemoryRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMemoryService(supabase);
      return await service.createMemoryRetention(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MemoryRetentionCreate>): Promise<MemoryRetention | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveMemoryService(supabase);
      return await service.updateMemoryRetention(schoolId, id, data);
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
      const service = new AdaptiveMemoryService(supabase);
      await service.deleteMemoryRetention(schoolId, id);
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
