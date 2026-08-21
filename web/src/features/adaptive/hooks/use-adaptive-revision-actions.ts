'use client';

import { useState, useCallback } from 'react';
import { AdaptiveRevisionService } from '../services/adaptive-revision.service';
import { createClient } from '@/lib/supabase/client';
import type { SmartRevision, SmartRevisionCreate } from '@educi/types';

export const useAdaptiveRevisionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SmartRevisionCreate): Promise<SmartRevision | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRevisionService(supabase);
      return await service.createSmartRevision(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SmartRevisionCreate>): Promise<SmartRevision | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveRevisionService(supabase);
      return await service.updateSmartRevision(schoolId, id, data);
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
      const service = new AdaptiveRevisionService(supabase);
      await service.deleteSmartRevision(schoolId, id);
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
