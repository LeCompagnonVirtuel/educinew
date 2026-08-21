'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudPipelineService } from '../services/global-cloud-cloud-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudPipeline } from '@educi/types';

export const useGlobalCloudCloudPipelineList = (schoolId: string) => {
  const [items, setItems] = useState<CloudPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudPipelineService(supabase);
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