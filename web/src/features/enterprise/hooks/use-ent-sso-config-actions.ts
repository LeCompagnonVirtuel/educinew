'use client';

import { useState, useCallback } from 'react';
import { EntSSOConfigService } from '../services/sso-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SSOConfig, SSOConfigCreate } from '@educi/types';

export const useEntSSOConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SSOConfigCreate): Promise<SSOConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSSOConfigService(supabase);
      return await service.createSSOConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SSOConfigCreate>): Promise<SSOConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSSOConfigService(supabase);
      return await service.updateSSOConfig(schoolId, id, data);
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
      const service = new EntSSOConfigService(supabase);
      await service.deleteSSOConfig(schoolId, id);
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
