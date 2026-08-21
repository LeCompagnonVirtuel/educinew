'use client';

import { useState, useCallback } from 'react';
import { EduOSInstitutionRegistryService } from '../services/eduos-institution-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { InstitutionRegistry } from '@educi/types';

export const useEduOSInstitutionRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<InstitutionRegistry>): Promise<InstitutionRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSInstitutionRegistryService(supabase);
      return await service.createInstitutionRegistry(schoolId, data as InstitutionRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<InstitutionRegistry>): Promise<InstitutionRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSInstitutionRegistryService(supabase);
      return await service.updateInstitutionRegistry(schoolId, id, data);
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
      const service = new EduOSInstitutionRegistryService(supabase);
      await service.deleteInstitutionRegistry(schoolId, id);
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
