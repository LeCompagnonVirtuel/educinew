'use client';

import { useState, useCallback } from 'react';
import { EduOSRegistrySearchQueryService } from '../services/eduos-registry-search-query.service';
import { createClient } from '@/lib/supabase/client';
import type { RegistrySearchQuery } from '@educi/types';

export const useEduOSRegistrySearchQueryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<RegistrySearchQuery>): Promise<RegistrySearchQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistrySearchQueryService(supabase);
      return await service.createRegistrySearchQuery(schoolId, data as RegistrySearchQuery);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<RegistrySearchQuery>): Promise<RegistrySearchQuery | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistrySearchQueryService(supabase);
      return await service.updateRegistrySearchQuery(schoolId, id, data);
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
      const service = new EduOSRegistrySearchQueryService(supabase);
      await service.deleteRegistrySearchQuery(schoolId, id);
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
