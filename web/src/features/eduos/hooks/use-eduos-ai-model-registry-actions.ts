'use client';

import { useState, useCallback } from 'react';
import { EduOSAIModelRegistryService } from '../services/eduos-ai-model-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { AIModelRegistry } from '@educi/types';

export const useEduOSAIModelRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AIModelRegistry): Promise<AIModelRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIModelRegistryService(supabase);
      return await service.createAIModelRegistry(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AIModelRegistry>): Promise<AIModelRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIModelRegistryService(supabase);
      return await service.updateAIModelRegistry(schoolId, id, data);
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
      const service = new EduOSAIModelRegistryService(supabase);
      await service.deleteAIModelRegistry(schoolId, id);
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