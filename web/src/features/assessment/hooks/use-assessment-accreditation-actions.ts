'use client';

import { useState, useCallback } from 'react';
import { AssessmentAccreditationService } from '../services/assessment-accreditation.service';
import { createClient } from '@/lib/supabase/client';
import type { Accreditation, AccreditationCreate } from '@educi/types';

export const useAssessmentAccreditationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AccreditationCreate): Promise<Accreditation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAccreditationService(supabase);
      return await service.createAccreditation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AccreditationCreate>): Promise<Accreditation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentAccreditationService(supabase);
      return await service.updateAccreditation(schoolId, id, data);
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
      const service = new AssessmentAccreditationService(supabase);
      await service.deleteAccreditation(schoolId, id);
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