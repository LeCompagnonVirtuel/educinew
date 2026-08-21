'use client';

import { useState, useCallback } from 'react';
import { EduOSDiplomaRegistryService } from '../services/eduos-diploma-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { DiplomaRegistry } from '@educi/types';

export const useEduOSDiplomaRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<DiplomaRegistry>): Promise<DiplomaRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDiplomaRegistryService(supabase);
      return await service.createDiplomaRegistry(schoolId, data as DiplomaRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DiplomaRegistry>): Promise<DiplomaRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDiplomaRegistryService(supabase);
      return await service.updateDiplomaRegistry(schoolId, id, data);
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
      const service = new EduOSDiplomaRegistryService(supabase);
      await service.deleteDiplomaRegistry(schoolId, id);
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
