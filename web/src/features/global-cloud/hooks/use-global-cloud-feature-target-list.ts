'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudFeatureTargetService } from '../services/global-cloud-feature-target.service';
import { createClient } from '@/lib/supabase/client';
import type { FeatureTarget } from '@educi/types';

export const useGlobalCloudFeatureTargetList = (schoolId: string) => {
  const [items, setItems] = useState<FeatureTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudFeatureTargetService(supabase);
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