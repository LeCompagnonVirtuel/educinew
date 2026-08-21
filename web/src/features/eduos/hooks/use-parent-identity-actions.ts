'use client';

import { useState, useCallback } from 'react';
import { EduOSParentIdentityService } from '../services/eduos-parent-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { ParentIdentity } from '@educi/types';

export const useEduOSParentIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ParentIdentity>): Promise<ParentIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSParentIdentityService(supabase);
      return await service.createParentIdentity(schoolId, data as ParentIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ParentIdentity>): Promise<ParentIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSParentIdentityService(supabase);
      return await service.updateParentIdentity(schoolId, id, data);
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
      const service = new EduOSParentIdentityService(supabase);
      await service.deleteParentIdentity(schoolId, id);
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
