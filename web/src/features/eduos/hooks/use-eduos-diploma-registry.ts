'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDiplomaRegistryService } from '../services/eduos-diploma-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { DiplomaRegistry } from '@educi/types';

export const useEduOSDiplomaRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<DiplomaRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDiplomaRegistryService(supabase);
      const data = await service.listDiplomaRegistrys(schoolId);
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
