'use client';

import { useState, useCallback } from 'react';
import { EntSAMLConfigService } from '../services/saml-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SAMLConfig, SAMLConfigCreate } from '@educi/types';

export const useEntSAMLConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SAMLConfigCreate): Promise<SAMLConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSAMLConfigService(supabase);
      return await service.createSAMLConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SAMLConfigCreate>): Promise<SAMLConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSAMLConfigService(supabase);
      return await service.updateSAMLConfig(schoolId, id, data);
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
      const service = new EntSAMLConfigService(supabase);
      await service.deleteSAMLConfig(schoolId, id);
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
