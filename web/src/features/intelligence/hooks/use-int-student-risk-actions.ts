'use client';

import { useState, useCallback } from 'react';
import { IntStudentRiskService } from '../services/int-student-risk.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentRiskAssessment, StudentRiskAssessmentCreate } from '@educi/types';

export const useIntStudentRiskActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: StudentRiskAssessmentCreate): Promise<StudentRiskAssessment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntStudentRiskService(supabase);
      return await service.createStudentRisk(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<StudentRiskAssessmentCreate>): Promise<StudentRiskAssessment | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntStudentRiskService(supabase);
      return await service.updateStudentRisk(schoolId, id, data);
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
      const service = new IntStudentRiskService(supabase);
      await service.deleteStudentRisk(schoolId, id);
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
