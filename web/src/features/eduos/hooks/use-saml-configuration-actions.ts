'use client';

import { useState, useCallback } from 'react';
import { EduOSSAMLConfigurationService } from '../services/eduos-saml-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { SAMLConfiguration } from '@educi/types';

export const useEduOSSAMLConfigurationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<SAMLConfiguration>): Promise<SAMLConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSAMLConfigurationService(supabase);
      return await service.createSAMLConfiguration(schoolId, data as SAMLConfiguration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SAMLConfiguration>): Promise<SAMLConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSAMLConfigurationService(supabase);
      return await service.updateSAMLConfiguration(schoolId, id, data);
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
      const service = new EduOSSAMLConfigurationService(supabase);
      await service.deleteSAMLConfiguration(schoolId, id);
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
