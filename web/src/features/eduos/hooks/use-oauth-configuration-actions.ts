'use client';

import { useState, useCallback } from 'react';
import { EduOSOAuthConfigurationService } from '../services/eduos-oauth-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { OAuthConfiguration } from '@educi/types';

export const useEduOSOAuthConfigurationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<OAuthConfiguration>): Promise<OAuthConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSOAuthConfigurationService(supabase);
      return await service.createOAuthConfiguration(schoolId, data as OAuthConfiguration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<OAuthConfiguration>): Promise<OAuthConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSOAuthConfigurationService(supabase);
      return await service.updateOAuthConfiguration(schoolId, id, data);
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
      const service = new EduOSOAuthConfigurationService(supabase);
      await service.deleteOAuthConfiguration(schoolId, id);
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
