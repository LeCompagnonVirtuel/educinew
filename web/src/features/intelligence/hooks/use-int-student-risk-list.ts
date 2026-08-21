'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntStudentRiskService } from '../services/int-student-risk.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentRiskAssessment } from '@educi/types';

export const useIntStudentRiskList = (schoolId: string) => {
  const [items, setItems] = useState<StudentRiskAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntStudentRiskService(supabase);
      const data = await service.listStudentRisks(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
