'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentConfigService } from '../services/deployment-config.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentConfig } from '@educi/types';

export const useEntDeploymentConfigList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentConfigService(supabase);
      const data = await service.listDeploymentConfigs(schoolId);
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
