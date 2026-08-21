'use client';

import { useState, useCallback } from 'react';
import { AssessmentCompetencyTestService } from '../services/assessment-competency-test.service';
import { createClient } from '@/lib/supabase/client';
import type { CompetencyTest, CompetencyTestCreate } from '@educi/types';

export const useAssessmentCompetencyTestActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: CompetencyTestCreate): Promise<CompetencyTest | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCompetencyTestService(supabase);
      return await service.createCompetencyTest(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<CompetencyTestCreate>): Promise<CompetencyTest | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentCompetencyTestService(supabase);
      return await service.updateCompetencyTest(schoolId, id, data);
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
      const service = new AssessmentCompetencyTestService(supabase);
      await service.deleteCompetencyTest(schoolId, id);
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