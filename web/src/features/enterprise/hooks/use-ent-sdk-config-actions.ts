'use client';

import { useState, useCallback } from 'react';
import { EntSDKConfigService } from '../services/sdk-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SDKConfig, SDKConfigCreate } from '@educi/types';

export const useEntSDKConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SDKConfigCreate): Promise<SDKConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKConfigService(supabase);
      return await service.createSDKConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SDKConfigCreate>): Promise<SDKConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKConfigService(supabase);
      return await service.updateSDKConfig(schoolId, id, data);
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
      const service = new EntSDKConfigService(supabase);
      await service.deleteSDKConfig(schoolId, id);
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
