'use client';

import { useState, useCallback } from 'react';
import { EduOSTeacherRegistryService } from '../services/eduos-teacher-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { TeacherRegistry } from '@educi/types';

export const useEduOSTeacherRegistryActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<TeacherRegistry>): Promise<TeacherRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTeacherRegistryService(supabase);
      return await service.createTeacherRegistry(schoolId, data as TeacherRegistry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<TeacherRegistry>): Promise<TeacherRegistry | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTeacherRegistryService(supabase);
      return await service.updateTeacherRegistry(schoolId, id, data);
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
      const service = new EduOSTeacherRegistryService(supabase);
      await service.deleteTeacherRegistry(schoolId, id);
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
