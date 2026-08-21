'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudContainerRegistryService } from '../services/global-cloud-container-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ContainerRegistry } from '@educi/types';

export const useGlobalCloudContainerRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<ContainerRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudContainerRegistryService(supabase);
      const data = await service.list(schoolId);
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