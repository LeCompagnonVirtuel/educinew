'use client';

import { useState, useCallback } from 'react';
import { EduOSELTConfigurationService } from '../services/eduos-elt-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { ELTConfiguration } from '@educi/types';

export const useEduOSELTConfigurationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ELTConfiguration): Promise<ELTConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSELTConfigurationService(supabase);
      return await service.createELTConfiguration(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ELTConfiguration>): Promise<ELTConfiguration | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSELTConfigurationService(supabase);
      return await service.updateELTConfiguration(schoolId, id, data);
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
      const service = new EduOSELTConfigurationService(supabase);
      await service.deleteELTConfiguration(schoolId, id);
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