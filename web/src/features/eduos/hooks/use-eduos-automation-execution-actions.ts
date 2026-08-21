'use client';

import { useState, useCallback } from 'react';
import { EduOSAutomationExecutionService } from '../services/eduos-automation-execution.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomationExecution } from '@educi/types';

export const useEduOSAutomationExecutionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomationExecution): Promise<AutomationExecution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationExecutionService(supabase);
      return await service.createAutomationExecution(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomationExecution>): Promise<AutomationExecution | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAutomationExecutionService(supabase);
      return await service.updateAutomationExecution(schoolId, id, data);
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
      const service = new EduOSAutomationExecutionService(supabase);
      await service.deleteAutomationExecution(schoolId, id);
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