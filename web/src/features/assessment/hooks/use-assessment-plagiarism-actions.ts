'use client';

import { useState, useCallback } from 'react';
import { AssessmentPlagiarismService } from '../services/assessment-plagiarism.service';
import { createClient } from '@/lib/supabase/client';
import type { Plagiarism, PlagiarismCreate } from '@educi/types';

export const useAssessmentPlagiarismActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: PlagiarismCreate): Promise<Plagiarism | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPlagiarismService(supabase);
      return await service.createPlagiarism(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<PlagiarismCreate>): Promise<Plagiarism | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentPlagiarismService(supabase);
      return await service.updatePlagiarism(schoolId, id, data);
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
      const service = new AssessmentPlagiarismService(supabase);
      await service.deletePlagiarism(schoolId, id);
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