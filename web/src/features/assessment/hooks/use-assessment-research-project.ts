'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentResearchProjectService } from '../services/assessment-research-project.service';
import { createClient } from '@/lib/supabase/client';
import type { ResearchProject } from '@educi/types';

export const useAssessmentResearchProjectList = (schoolId: string) => {
  const [items, setItems] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentResearchProjectService(supabase);
      const data = await service.listResearchProjects(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};