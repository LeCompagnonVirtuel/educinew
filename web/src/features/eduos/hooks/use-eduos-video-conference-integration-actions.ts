'use client';

import { useState, useCallback } from 'react';
import { EduOSVideoConferenceIntegrationService } from '../services/eduos-video-conference-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { VideoConferenceIntegration } from '@educi/types';

export const useEduOSVideoConferenceIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: VideoConferenceIntegration): Promise<VideoConferenceIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVideoConferenceIntegrationService(supabase);
      return await service.createVideoConferenceIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<VideoConferenceIntegration>): Promise<VideoConferenceIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSVideoConferenceIntegrationService(supabase);
      return await service.updateVideoConferenceIntegration(schoolId, id, data);
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
      const service = new EduOSVideoConferenceIntegrationService(supabase);
      await service.deleteVideoConferenceIntegration(schoolId, id);
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