'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentVariableService } from '../services/deployment-variable.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentVariable } from '@educi/types';

export const useEntDeploymentVariableList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentVariable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentVariableService(supabase);
      const data = await service.listDeploymentVariables(schoolId);
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
