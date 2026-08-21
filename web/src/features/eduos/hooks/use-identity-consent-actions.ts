'use client';

import { useState, useCallback } from 'react';
import { EduOSIdentityConsentService } from '../services/eduos-identity-consent.service';
import { createClient } from '@/lib/supabase/client';
import type { IdentityConsent } from '@educi/types';

export const useEduOSIdentityConsentActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<IdentityConsent>): Promise<IdentityConsent | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityConsentService(supabase);
      return await service.createIdentityConsent(schoolId, data as IdentityConsent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IdentityConsent>): Promise<IdentityConsent | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSIdentityConsentService(supabase);
      return await service.updateIdentityConsent(schoolId, id, data);
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
      const service = new EduOSIdentityConsentService(supabase);
      await service.deleteIdentityConsent(schoolId, id);
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
