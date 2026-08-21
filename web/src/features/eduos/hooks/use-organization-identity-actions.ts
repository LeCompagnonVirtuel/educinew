'use client';

import { useState, useCallback } from 'react';
import { EduOSOrganizationIdentityService } from '../services/eduos-organization-identity.service';
import { createClient } from '@/lib/supabase/client';
import type { OrganizationIdentity } from '@educi/types';

export const useEduOSOrganizationIdentityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<OrganizationIdentity>): Promise<OrganizationIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSOrganizationIdentityService(supabase);
      return await service.createOrganizationIdentity(schoolId, data as OrganizationIdentity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<OrganizationIdentity>): Promise<OrganizationIdentity | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSOrganizationIdentityService(supabase);
      return await service.updateOrganizationIdentity(schoolId, id, data);
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
      const service = new EduOSOrganizationIdentityService(supabase);
      await service.deleteOrganizationIdentity(schoolId, id);
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
