'use client';

import { useState, useCallback } from 'react';
import { EntJWTConfigService } from '../services/jwt-config.service';
import { createClient } from '@/lib/supabase/client';
import type { JWTConfig, JWTConfigCreate } from '@educi/types';

export const useEntJWTConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: JWTConfigCreate): Promise<JWTConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntJWTConfigService(supabase);
      return await service.createJWTConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<JWTConfigCreate>): Promise<JWTConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntJWTConfigService(supabase);
      return await service.updateJWTConfig(schoolId, id, data);
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
      const service = new EntJWTConfigService(supabase);
      await service.deleteJWTConfig(schoolId, id);
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
