'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentRollbackService } from '../services/deployment-rollback.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentRollback } from '@educi/types';

export const useEntDeploymentRollbackList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentRollback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentRollbackService(supabase);
      const data = await service.listDeploymentRollbacks(schoolId);
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
