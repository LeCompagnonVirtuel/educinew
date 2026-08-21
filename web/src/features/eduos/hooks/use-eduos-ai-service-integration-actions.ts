'use client';

import { useState, useCallback } from 'react';
import { EduOSAIServiceIntegrationService } from '../services/eduos-ai-service-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { AIServiceIntegration } from '@educi/types';

export const useEduOSAIServiceIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AIServiceIntegration): Promise<AIServiceIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIServiceIntegrationService(supabase);
      return await service.createAIServiceIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AIServiceIntegration>): Promise<AIServiceIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIServiceIntegrationService(supabase);
      return await service.updateAIServiceIntegration(schoolId, id, data);
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
      const service = new EduOSAIServiceIntegrationService(supabase);
      await service.deleteAIServiceIntegration(schoolId, id);
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