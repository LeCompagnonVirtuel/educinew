'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSResolutionService } from '../services/eduos-resolution.service';
import { createClient } from '@/lib/supabase/client';
import type { Resolution } from '@educi/types';

export const useEduOSResolutionList = (schoolId: string) => {
  const [items, setItems] = useState<Resolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResolutionService(supabase);
      const data = await service.listResolutions(schoolId);
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
