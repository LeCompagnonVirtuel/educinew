'use client';

import { useState, useCallback } from 'react';
import { EduOSFeatureRegistryService } from '../services/eduos-feature-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { FeatureRegistry } from '@educi/types';

export const useEduOSFeatureRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<FeatureRegistry>): Promise<FeatureRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSFeatureRegistryService(supabase);
      return await service.createFeatureRegistry(schoolId, data as FeatureRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<FeatureRegistry>): Promise<FeatureRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSFeatureRegistryService(supabase);
      return await service.updateFeatureRegistry(schoolId, id, data);
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
      const service = new EduOSFeatureRegistryService(supabase);
      await service.deleteFeatureRegistry(schoolId, id);
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
