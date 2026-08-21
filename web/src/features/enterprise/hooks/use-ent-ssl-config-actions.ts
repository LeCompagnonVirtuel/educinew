'use client';

import { useState, useCallback } from 'react';
import { EntSSLConfigService } from '../services/ssl-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SSLConfig, SSLConfigCreate } from '@educi/types';

export const useEntSSLConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SSLConfigCreate): Promise<SSLConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSSLConfigService(supabase);
      return await service.createSSLConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SSLConfigCreate>): Promise<SSLConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSSLConfigService(supabase);
      return await service.updateSSLConfig(schoolId, id, data);
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
      const service = new EntSSLConfigService(supabase);
      await service.deleteSSLConfig(schoolId, id);
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
