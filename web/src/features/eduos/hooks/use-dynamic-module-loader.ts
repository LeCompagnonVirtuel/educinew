'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSDynamicModuleLoaderService } from '../services/eduos-dynamic-module-loader.service';
import { createClient } from '@/lib/supabase/client';
import type { DynamicModuleLoader } from '@educi/types';

export const useEduOSDynamicModuleLoaderList = (schoolId: string) => {
  const [items, setItems] = useState<DynamicModuleLoader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDynamicModuleLoaderService(supabase);
      const data = await service.listDynamicModuleLoaders(schoolId);
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
