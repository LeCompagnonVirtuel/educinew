'use client';

import { useState, useCallback } from 'react';
import { EduOSAIMonitoringService } from '../services/eduos-ai-monitoring.service';
import { createClient } from '@/lib/supabase/client';
import type { AIMonitoring } from '@educi/types';

export const useEduOSAIMonitoringActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AIMonitoring): Promise<AIMonitoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIMonitoringService(supabase);
      return await service.createAIMonitoring(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AIMonitoring>): Promise<AIMonitoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSAIMonitoringService(supabase);
      return await service.updateAIMonitoring(schoolId, id, data);
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
      const service = new EduOSAIMonitoringService(supabase);
      await service.deleteAIMonitoring(schoolId, id);
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