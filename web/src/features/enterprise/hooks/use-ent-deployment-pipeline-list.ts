'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentPipelineService } from '../services/deployment-pipeline.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentPipeline } from '@educi/types';

export const useEntDeploymentPipelineList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentPipelineService(supabase);
      const data = await service.listDeploymentPipelines(schoolId);
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
