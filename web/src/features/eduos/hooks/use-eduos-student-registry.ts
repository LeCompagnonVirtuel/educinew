'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSStudentRegistryService } from '../services/eduos-student-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { StudentRegistry } from '@educi/types';

export const useEduOSStudentRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<StudentRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSStudentRegistryService(supabase);
      const data = await service.listStudentRegistrys(schoolId);
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
