'use client';

import { useState, useCallback } from 'react';
import { EntAlertTemplateService } from '../services/alert-template.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertTemplate, AlertTemplateCreate } from '@educi/types';

export const useEntAlertTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AlertTemplateCreate): Promise<AlertTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertTemplateService(supabase);
      return await service.createAlertTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AlertTemplateCreate>): Promise<AlertTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertTemplateService(supabase);
      return await service.updateAlertTemplate(schoolId, id, data);
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
      const service = new EntAlertTemplateService(supabase);
      await service.deleteAlertTemplate(schoolId, id);
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
