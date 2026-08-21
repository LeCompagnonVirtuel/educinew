'use client';

import { useState, useCallback } from 'react';
import { EduOSNoCodeActionService } from '../services/eduos-no-code-action.service';
import { createClient } from '@/lib/supabase/client';
import type { NoCodeAction } from '@educi/types';

export const useEduOSNoCodeActionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: NoCodeAction): Promise<NoCodeAction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNoCodeActionService(supabase);
      return await service.createNoCodeAction(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<NoCodeAction>): Promise<NoCodeAction | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSNoCodeActionService(supabase);
      return await service.updateNoCodeAction(schoolId, id, data);
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
      const service = new EduOSNoCodeActionService(supabase);
      await service.deleteNoCodeAction(schoolId, id);
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