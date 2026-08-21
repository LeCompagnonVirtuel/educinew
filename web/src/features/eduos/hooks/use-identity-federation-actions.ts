'use client';

import { useState, useCallback } from 'react';
import { EduOSIdentityFederationService } from '../services/eduos-identity-federation.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityFederation } from '@educi/types';

export const useEduOSIdentityFederationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<IdentityFederation>): Promise<IdentityFederation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityFederationService(supabase);
      return await service.createIdentityFederation(schoolId, data as IdentityFederation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IdentityFederation>): Promise<IdentityFederation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityFederationService(supabase);
      return await service.updateIdentityFederation(schoolId, id, data);
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
      const service = new EduOSIdentityFederationService(supabase);
      await service.deleteIdentityFederation(schoolId, id);
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
