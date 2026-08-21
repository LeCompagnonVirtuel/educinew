'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudContainerImageService } from '../services/global-cloud-container-image.service';
import { createClient } from '@/lib/supabase/client';
import type { ContainerImage } from '@educi/types';

export const useGlobalCloudContainerImageList = (schoolId: string) => {
  const [items, setItems] = useState<ContainerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudContainerImageService(supabase);
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