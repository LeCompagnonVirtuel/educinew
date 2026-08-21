'use client';

import { useState, useCallback } from 'react';
import { EduOSCloudIntegrationService } from '../services/eduos-cloud-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudIntegration } from '@educi/types';

export const useEduOSCloudIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CloudIntegration): Promise<CloudIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCloudIntegrationService(supabase);
      return await service.createCloudIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CloudIntegration>): Promise<CloudIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSCloudIntegrationService(supabase);
      return await service.updateCloudIntegration(schoolId, id, data);
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
      const service = new EduOSCloudIntegrationService(supabase);
      await service.deleteCloudIntegration(schoolId, id);
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