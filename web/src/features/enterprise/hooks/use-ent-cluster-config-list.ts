'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntClusterConfigService } from '../services/cluster-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ClusterConfig } from '@educi/types';

export const useEntClusterConfigList = (schoolId: string) => {
  const [items, setItems] = useState<ClusterConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntClusterConfigService(supabase);
      const data = await service.listClusterConfigs(schoolId);
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
