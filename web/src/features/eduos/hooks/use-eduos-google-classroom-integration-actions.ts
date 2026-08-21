'use client';

import { useState, useCallback } from 'react';
import { EduOSGoogleClassroomIntegrationService } from '../services/eduos-google-classroom-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { GoogleClassroomIntegration } from '@educi/types';

export const useEduOSGoogleClassroomIntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: GoogleClassroomIntegration): Promise<GoogleClassroomIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGoogleClassroomIntegrationService(supabase);
      return await service.createGoogleClassroomIntegration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<GoogleClassroomIntegration>): Promise<GoogleClassroomIntegration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGoogleClassroomIntegrationService(supabase);
      return await service.updateGoogleClassroomIntegration(schoolId, id, data);
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
      const service = new EduOSGoogleClassroomIntegrationService(supabase);
      await service.deleteGoogleClassroomIntegration(schoolId, id);
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