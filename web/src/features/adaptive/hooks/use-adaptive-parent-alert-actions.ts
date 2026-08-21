'use client';

import { useState, useCallback } from 'react';
import { AdaptiveParentAlertService } from '../services/adaptive-parent-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { ParentAlert } from '@educi/types';

export const useAdaptiveParentAlertActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<ParentAlert, 'id' | 'created_at'>): Promise<ParentAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveParentAlertService(supabase);
      return await service.createParentAlert(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Omit<ParentAlert, 'id' | 'created_at'>>): Promise<ParentAlert | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveParentAlertService(supabase);
      return await service.updateParentAlert(schoolId, id, data);
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
      const service = new AdaptiveParentAlertService(supabase);
      await service.deleteParentAlert(schoolId, id);
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
