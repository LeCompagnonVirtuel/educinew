'use client';

import { useState, useCallback } from 'react';
import { AdaptiveAcademicRiskService } from '../services/adaptive-academic-risk.service';
import { createClient } from '@/lib/supabase/client';
import type { AcademicRisk, AcademicRiskCreate } from '@educi/types';

export const useAdaptiveAcademicRiskActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: AcademicRiskCreate): Promise<AcademicRisk | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAcademicRiskService(supabase);
      return await service.createAcademicRisk(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<AcademicRiskCreate>): Promise<AcademicRisk | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveAcademicRiskService(supabase);
      return await service.updateAcademicRisk(schoolId, id, data);
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
      const service = new AdaptiveAcademicRiskService(supabase);
      await service.deleteAcademicRisk(schoolId, id);
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
