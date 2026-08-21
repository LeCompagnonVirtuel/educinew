'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationVariableService } from '../services/eduos-automation-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationVariable } from '@educi/types';

export const useEduOSAutomationVariableActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationVariable): Promise<AutomationVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationVariableService(supabase);
      return await service.createAutomationVariable(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationVariable>): Promise<AutomationVariable | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationVariableService(supabase);
      return await service.updateAutomationVariable(schoolId, id, data);
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
      const service = new EduOSAutomationVariableService(supabase);
      await service.deleteAutomationVariable(schoolId, id);
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