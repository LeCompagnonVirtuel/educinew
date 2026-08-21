'use client';

import { useState, useCallback } from 'react';
import { AssessmentDigitalDiplomaService } from '../services/assessment-digital-diploma.service';
import { createClient } from '@/lib/supabase/client';
import type { DigitalDiploma, DigitalDiplomaCreate } from '@educi/types';

export const useAssessmentDigitalDiplomaActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DigitalDiplomaCreate): Promise<DigitalDiploma | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentDigitalDiplomaService(supabase);
      return await service.createDigitalDiploma(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DigitalDiplomaCreate>): Promise<DigitalDiploma | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentDigitalDiplomaService(supabase);
      return await service.updateDigitalDiploma(schoolId, id, data);
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
      const service = new AssessmentDigitalDiplomaService(supabase);
      await service.deleteDigitalDiploma(schoolId, id);
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