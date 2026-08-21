'use client';

import { useState, useCallback } from 'react';
import { EntSDKVersionService } from '../services/sdk-version.service';
import { createClient } from '@/lib/supabase/client';
import type { SDKVersion, SDKVersionCreate } from '@educi/types';

export const useEntSDKVersionActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SDKVersionCreate): Promise<SDKVersion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKVersionService(supabase);
      return await service.createSDKVersion(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SDKVersionCreate>): Promise<SDKVersion | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSDKVersionService(supabase);
      return await service.updateSDKVersion(schoolId, id, data);
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
      const service = new EntSDKVersionService(supabase);
      await service.deleteSDKVersion(schoolId, id);
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
