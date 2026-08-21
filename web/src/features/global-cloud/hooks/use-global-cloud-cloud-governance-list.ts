'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudGovernanceService } from '../services/global-cloud-cloud-governance.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudGovernance } from '@educi/types';

export const useGlobalCloudCloudGovernanceList = (schoolId: string) => {
  const [items, setItems] = useState<CloudGovernance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudGovernanceService(supabase);
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