'use client';

import { useState, useCallback } from 'react';
import { EntTokenRevocationService } from '../services/token-revocation.service';
import { createClient } from '@/lib/supabase/client';
import type { TokenRevocation, TokenRevocationCreate } from '@educi/types';

export const useEntTokenRevocationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: TokenRevocationCreate): Promise<TokenRevocation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTokenRevocationService(supabase);
      return await service.createTokenRevocation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TokenRevocationCreate>): Promise<TokenRevocation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntTokenRevocationService(supabase);
      return await service.updateTokenRevocation(schoolId, id, data);
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
      const service = new EntTokenRevocationService(supabase);
      await service.deleteTokenRevocation(schoolId, id);
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
