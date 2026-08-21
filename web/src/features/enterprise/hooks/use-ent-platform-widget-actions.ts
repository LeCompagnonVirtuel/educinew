'use client';

import { useState, useCallback } from 'react';
import { EntPlatformWidgetService } from '../services/platform-widget.service';
import { createClient } from '@/lib/supabase/client';
import type { PlatformWidget, PlatformWidgetCreate } from '@educi/types';

export const useEntPlatformWidgetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlatformWidgetCreate): Promise<PlatformWidget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformWidgetService(supabase);
      return await service.createPlatformWidget(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlatformWidgetCreate>): Promise<PlatformWidget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntPlatformWidgetService(supabase);
      return await service.updatePlatformWidget(schoolId, id, data);
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
      const service = new EntPlatformWidgetService(supabase);
      await service.deletePlatformWidget(schoolId, id);
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
