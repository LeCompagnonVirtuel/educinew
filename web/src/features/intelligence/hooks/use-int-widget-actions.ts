'use client';

import { useState, useCallback } from 'react';
import { IntWidgetService } from '../services/int-widget.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceWidget, IntelligenceWidgetCreate } from '@educi/types';

export const useIntWidgetActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceWidgetCreate): Promise<IntelligenceWidget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntWidgetService(supabase);
      return await service.createWidget(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceWidgetCreate>): Promise<IntelligenceWidget | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntWidgetService(supabase);
      return await service.updateWidget(schoolId, id, data);
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
      const service = new IntWidgetService(supabase);
      await service.deleteWidget(schoolId, id);
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
