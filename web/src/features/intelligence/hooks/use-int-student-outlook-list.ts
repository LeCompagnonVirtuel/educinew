'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntStudentOutlookService } from '../services/int-student-outlook.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentOutlook } from '@educi/types';

export const useIntStudentOutlookList = (schoolId: string) => {
  const [items, setItems] = useState<StudentOutlook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntStudentOutlookService(supabase);
      const data = await service.listStudentOutlooks(schoolId);
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
