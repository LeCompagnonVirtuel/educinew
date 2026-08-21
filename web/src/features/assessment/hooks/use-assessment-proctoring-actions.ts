'use client';

import { useState, useCallback } from 'react';
import { AssessmentProctoringService } from '../services/assessment-proctoring.service';
import { createClient } from '@/lib/supabase/client';
import type { Proctoring, ProctoringCreate } from '@educi/types';

export const useAssessmentProctoringActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ProctoringCreate): Promise<Proctoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentProctoringService(supabase);
      return await service.createProctoring(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ProctoringCreate>): Promise<Proctoring | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentProctoringService(supabase);
      return await service.updateProctoring(schoolId, id, data);
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
      const service = new AssessmentProctoringService(supabase);
      await service.deleteProctoring(schoolId, id);
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