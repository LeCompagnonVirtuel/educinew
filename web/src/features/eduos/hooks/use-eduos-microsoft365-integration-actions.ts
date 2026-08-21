'use client';

import { useState, useCallback } from 'react';
import { EduOSMicrosoft365IntegrationService } from '../services/eduos-microsoft365-integration.service';
import { createClient } from '@/lib/supabase/client';
import type { Microsoft365Integration } from '@educi/types';

export const useEduOSMicrosoft365IntegrationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Microsoft365Integration): Promise<Microsoft365Integration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMicrosoft365IntegrationService(supabase);
      return await service.createMicrosoft365Integration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Microsoft365Integration>): Promise<Microsoft365Integration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSMicrosoft365IntegrationService(supabase);
      return await service.updateMicrosoft365Integration(schoolId, id, data);
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
      const service = new EduOSMicrosoft365IntegrationService(supabase);
      await service.deleteMicrosoft365Integration(schoolId, id);
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