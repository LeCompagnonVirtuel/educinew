'use client';

import { useState, useEffect, useCallback } from 'react';
import { AssessmentSkillMatrixService } from '../services/assessment-skill-matrix.service';
import { createClient } from '@/lib/supabase/client';
import type { SkillMatrix } from '@educi/types';

export const useAssessmentSkillMatrixList = (schoolId: string) => {
  const [items, setItems] = useState<SkillMatrix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AssessmentSkillMatrixService(supabase);
      const data = await service.listSkillMatrixes(schoolId);
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