'use client';

import { useState, useCallback } from 'react';
import { EduOSStateDefinitionService } from '../services/eduos-state-definition.service';
import { createClient } from '@/lib/supabase/client';
import type { StateDefinition } from '@educi/types';

export const useEduOSStateDefinitionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<StateDefinition>): Promise<StateDefinition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateDefinitionService(supabase);
      return await service.createStateDefinition(schoolId, data as StateDefinition);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StateDefinition>): Promise<StateDefinition | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStateDefinitionService(supabase);
      return await service.updateStateDefinition(schoolId, id, data);
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
      const service = new EduOSStateDefinitionService(supabase);
      await service.deleteStateDefinition(schoolId, id);
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
