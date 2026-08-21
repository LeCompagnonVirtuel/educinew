'use client';

import { useState, useCallback } from 'react';
import { EduOSLDAPConfigurationService } from '../services/eduos-ldap-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { LDAPConfiguration } from '@educi/types';

export const useEduOSLDAPConfigurationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<LDAPConfiguration>): Promise<LDAPConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLDAPConfigurationService(supabase);
      return await service.createLDAPConfiguration(schoolId, data as LDAPConfiguration);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<LDAPConfiguration>): Promise<LDAPConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLDAPConfigurationService(supabase);
      return await service.updateLDAPConfiguration(schoolId, id, data);
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
      const service = new EduOSLDAPConfigurationService(supabase);
      await service.deleteLDAPConfiguration(schoolId, id);
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
