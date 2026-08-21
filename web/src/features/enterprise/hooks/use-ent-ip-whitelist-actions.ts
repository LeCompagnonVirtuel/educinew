'use client';

import { useState, useCallback } from 'react';
import { EntIPWhitelistService } from '../services/ip-whitelist.service';
import { createClient } from '@/lib/supabase/client';
import type { IPWhitelist, IPWhitelistCreate } from '@educi/types';

export const useEntIPWhitelistActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IPWhitelistCreate): Promise<IPWhitelist | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIPWhitelistService(supabase);
      return await service.createIPWhitelist(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IPWhitelistCreate>): Promise<IPWhitelist | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIPWhitelistService(supabase);
      return await service.updateIPWhitelist(schoolId, id, data);
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
      const service = new EntIPWhitelistService(supabase);
      await service.deleteIPWhitelist(schoolId, id);
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
