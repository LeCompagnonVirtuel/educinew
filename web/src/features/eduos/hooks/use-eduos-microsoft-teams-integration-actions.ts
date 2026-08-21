'use client';

import { useState, useCallback } from 'react';
import { EduOSMicrosoftTeamsIntegrationService } from '../services/eduos-microsoft-teams-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { MicrosoftTeamsIntegration } from '@educi/types';

export const useEduOSMicrosoftTeamsIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: MicrosoftTeamsIntegration): Promise<MicrosoftTeamsIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMicrosoftTeamsIntegrationService(supabase);
      return await service.createMicrosoftTeamsIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<MicrosoftTeamsIntegration>): Promise<MicrosoftTeamsIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMicrosoftTeamsIntegrationService(supabase);
      return await service.updateMicrosoftTeamsIntegration(schoolId, id, data);
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
      const service = new EduOSMicrosoftTeamsIntegrationService(supabase);
      await service.deleteMicrosoftTeamsIntegration(schoolId, id);
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