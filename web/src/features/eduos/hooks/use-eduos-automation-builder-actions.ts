'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationBuilderService } from '../services/eduos-automation-builder.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationBuilder } from '@educi/types';

export const useEduOSAutomationBuilderActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationBuilder): Promise<AutomationBuilder | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationBuilderService(supabase);
      return await service.createAutomationBuilder(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationBuilder>): Promise<AutomationBuilder | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationBuilderService(supabase);
      return await service.updateAutomationBuilder(schoolId, id, data);
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
      const service = new EduOSAutomationBuilderService(supabase);
      await service.deleteAutomationBuilder(schoolId, id);
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