'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentStageService } from '../services/deployment-stage.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentStage } from '@educi/types';

export const useEntDeploymentStageList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentStageService(supabase);
      const data = await service.listDeploymentStages(schoolId);
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
