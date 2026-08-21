'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSTeacherRegistryService } from '../services/eduos-teacher-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { TeacherRegistry } from '@educi/types';

export const useEduOSTeacherRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<TeacherRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTeacherRegistryService(supabase);
      const data = await service.listTeacherRegistrys(schoolId);
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
