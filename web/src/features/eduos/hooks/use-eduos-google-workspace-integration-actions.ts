'use client';

import { useState, useCallback } from 'react';
import { EduOSGoogleWorkspaceIntegrationService } from '../services/eduos-google-workspace-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { GoogleWorkspaceIntegration } from '@educi/types';

export const useEduOSGoogleWorkspaceIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: GoogleWorkspaceIntegration): Promise<GoogleWorkspaceIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGoogleWorkspaceIntegrationService(supabase);
      return await service.createGoogleWorkspaceIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GoogleWorkspaceIntegration>): Promise<GoogleWorkspaceIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGoogleWorkspaceIntegrationService(supabase);
      return await service.updateGoogleWorkspaceIntegration(schoolId, id, data);
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
      const service = new EduOSGoogleWorkspaceIntegrationService(supabase);
      await service.deleteGoogleWorkspaceIntegration(schoolId, id);
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