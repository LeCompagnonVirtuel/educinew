'use client';

import { useState, useCallback } from 'react';
import { EduOSSSOConfigurationService } from '../services/eduos-sso-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { SSOConfiguration } from '@educi/types';

export const useEduOSSSOConfigurationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SSOConfiguration>): Promise<SSOConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSSOConfigurationService(supabase);
      return await service.createSSOConfiguration(schoolId, data as SSOConfiguration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SSOConfiguration>): Promise<SSOConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSSOConfigurationService(supabase);
      return await service.updateSSOConfiguration(schoolId, id, data);
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
      const service = new EduOSSSOConfigurationService(supabase);
      await service.deleteSSOConfiguration(schoolId, id);
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
