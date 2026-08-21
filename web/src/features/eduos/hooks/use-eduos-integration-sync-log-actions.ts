'use client';

import { useState, useCallback } from 'react';
import { EduOSIntegrationSyncLogService } from '../services/eduos-integration-sync-log.service';
import { createClient } from '@/lib/supabase/client';
import type { IntegrationSyncLog } from '@educi/types';

export const useEduOSIntegrationSyncLogActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntegrationSyncLog): Promise<IntegrationSyncLog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationSyncLogService(supabase);
      return await service.createIntegrationSyncLog(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntegrationSyncLog>): Promise<IntegrationSyncLog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIntegrationSyncLogService(supabase);
      return await service.updateIntegrationSyncLog(schoolId, id, data);
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
      const service = new EduOSIntegrationSyncLogService(supabase);
      await service.deleteIntegrationSyncLog(schoolId, id);
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