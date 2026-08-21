'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSScholarshipService } from '../services/eduos-scholarship.service';
import { createClient } from '@/lib/supabase/client';
import type { Scholarship } from '@educi/types';

export const useEduOSScholarshipList = (schoolId: string) => {
  const [items, setItems] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSScholarshipService(supabase);
      const data = await service.listScholarships(schoolId);
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
