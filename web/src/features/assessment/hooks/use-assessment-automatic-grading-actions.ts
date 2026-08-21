'use client';

import { useState, useCallback } from 'react';
import { AssessmentAutomaticGradingService } from '../services/assessment-automatic-grading.service';
import { createClient } from '@/lib/supabase/client';
import type { AutomaticGrading, AutomaticGradingCreate } from '@educi/types';

export const useAssessmentAutomaticGradingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AutomaticGradingCreate): Promise<AutomaticGrading | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAutomaticGradingService(supabase);
      return await service.createAutomaticGrading(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AutomaticGradingCreate>): Promise<AutomaticGrading | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAutomaticGradingService(supabase);
      return await service.updateAutomaticGrading(schoolId, id, data);
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
      const service = new AssessmentAutomaticGradingService(supabase);
      await service.deleteAutomaticGrading(schoolId, id);
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