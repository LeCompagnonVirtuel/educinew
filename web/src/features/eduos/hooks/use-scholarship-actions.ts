'use client';

import { useState, useCallback } from 'react';
import { EduOSScholarshipService } from '../services/eduos-scholarship.service';
import { createClient } from '@/lib/supabase/client';
import type { Scholarship } from '@educi/types';

export const useEduOSScholarshipActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Partial<Scholarship>): Promise<Scholarship | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSScholarshipService(supabase);
      return await service.createScholarship(schoolId, data as Scholarship);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<Scholarship>): Promise<Scholarship | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSScholarshipService(supabase);
      return await service.updateScholarship(schoolId, id, data);
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
      const service = new EduOSScholarshipService(supabase);
      await service.deleteScholarship(schoolId, id);
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
