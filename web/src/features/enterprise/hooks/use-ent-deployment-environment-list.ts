'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentEnvironmentService } from '../services/deployment-environment.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentEnvironment } from '@educi/types';

export const useEntDeploymentEnvironmentList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentEnvironment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentEnvironmentService(supabase);
      const data = await service.listDeploymentEnvironments(schoolId);
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
