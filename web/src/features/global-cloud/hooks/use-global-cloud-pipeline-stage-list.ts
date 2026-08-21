'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudPipelineStageService } from '../services/global-cloud-pipeline-stage.service';
import { createClient } from '@/lib/supabase/client';
import type { PipelineStage } from '@educi/types';

export const useGlobalCloudPipelineStageList = (schoolId: string) => {
  const [items, setItems] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudPipelineStageService(supabase);
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