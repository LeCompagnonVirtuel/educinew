'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDeploymentSecretService } from '../services/deployment-secret.service';
import { createClient } from '@/lib/supabase/client';
import type { DeploymentSecret } from '@educi/types';

export const useEntDeploymentSecretList = (schoolId: string) => {
  const [items, setItems] = useState<DeploymentSecret[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDeploymentSecretService(supabase);
      const data = await service.listDeploymentSecrets(schoolId);
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
