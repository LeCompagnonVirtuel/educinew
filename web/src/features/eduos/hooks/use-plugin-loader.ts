'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSPluginLoaderService } from '../services/eduos-plugin-loader.service';
import { createClient } from '@/lib/supabase/client';
import type { PluginLoader } from '@educi/types';

export const useEduOSPluginLoaderList = (schoolId: string) => {
  const [items, setItems] = useState<PluginLoader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSPluginLoaderService(supabase);
      const data = await service.listPluginLoaders(schoolId);
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
