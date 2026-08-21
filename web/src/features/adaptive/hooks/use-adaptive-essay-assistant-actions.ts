'use client';

import { useState, useCallback } from 'react';
import { AdaptiveEssayAssistantService } from '../services/adaptive-essay-assistant.service';
import { createClient } from '@/lib/supabase/client';
import type { EssayAssistant, EssayAssistantCreate } from '@educi/types';

export const useAdaptiveEssayAssistantActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: EssayAssistantCreate): Promise<EssayAssistant | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveEssayAssistantService(supabase);
      return await service.createAssistant(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<EssayAssistantCreate>): Promise<EssayAssistant | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveEssayAssistantService(supabase);
      return await service.updateAssistant(schoolId, id, data);
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
      const service = new AdaptiveEssayAssistantService(supabase);
      await service.deleteAssistant(schoolId, id);
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
