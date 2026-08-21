'use client';

import { useState, useCallback } from 'react';
import { EntOAuthConfigService } from '../services/oauth-config.service';
import { createClient } from '@/lib/supabase/client';
import type { OAuthConfig, OAuthConfigCreate } from '@educi/types';

export const useEntOAuthConfigActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: OAuthConfigCreate): Promise<OAuthConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntOAuthConfigService(supabase);
      return await service.createOAuthConfig(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<OAuthConfigCreate>): Promise<OAuthConfig | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntOAuthConfigService(supabase);
      return await service.updateOAuthConfig(schoolId, id, data);
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
      const service = new EntOAuthConfigService(supabase);
      await service.deleteOAuthConfig(schoolId, id);
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
