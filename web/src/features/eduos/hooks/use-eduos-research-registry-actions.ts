'use client';

import { useState, useCallback } from 'react';
import { EduOSResearchRegistryService } from '../services/eduos-research-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ResearchRegistry } from '@educi/types';

export const useEduOSResearchRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<ResearchRegistry>): Promise<ResearchRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResearchRegistryService(supabase);
      return await service.createResearchRegistry(schoolId, data as ResearchRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ResearchRegistry>): Promise<ResearchRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResearchRegistryService(supabase);
      return await service.updateResearchRegistry(schoolId, id, data);
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
      const service = new EduOSResearchRegistryService(supabase);
      await service.deleteResearchRegistry(schoolId, id);
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
