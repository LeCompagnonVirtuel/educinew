'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSGraduateRegistryService } from '../services/eduos-graduate-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { GraduateRegistry } from '@educi/types';

export const useEduOSGraduateRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<GraduateRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGraduateRegistryService(supabase);
      const data = await service.listGraduateRegistrys(schoolId);
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
