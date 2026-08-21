'use client';

import { useState, useCallback } from 'react';
import { AssessmentResearchProjectService } from '../services/assessment-research-project.service';
import { createClient } from '@/lib/supabase/client';
import type { ResearchProject, ResearchProjectCreate } from '@educi/types';

export const useAssessmentResearchProjectActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: ResearchProjectCreate): Promise<ResearchProject | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentResearchProjectService(supabase);
      return await service.createResearchProject(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<ResearchProjectCreate>): Promise<ResearchProject | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentResearchProjectService(supabase);
      return await service.updateResearchProject(schoolId, id, data);
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
      const service = new AssessmentResearchProjectService(supabase);
      await service.deleteResearchProject(schoolId, id);
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