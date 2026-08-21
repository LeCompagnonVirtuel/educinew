'use client';

import { useState, useCallback } from 'react';
import { EntIPBlacklistService } from '../services/ip-blacklist.service';
import { createClient } from '@/lib/supabase/client';
import type { IPBlacklist, IPBlacklistCreate } from '@educi/types';

export const useEntIPBlacklistActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IPBlacklistCreate): Promise<IPBlacklist | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIPBlacklistService(supabase);
      return await service.createIPBlacklist(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IPBlacklistCreate>): Promise<IPBlacklist | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIPBlacklistService(supabase);
      return await service.updateIPBlacklist(schoolId, id, data);
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
      const service = new EntIPBlacklistService(supabase);
      await service.deleteIPBlacklist(schoolId, id);
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
