'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMultiGovernmentService } from '../services/global-cloud-multi-government.service';
import { createClient } from '@/lib/supabase/client';
import type { MultiGovernment } from '@educi/types';

export const useGlobalCloudMultiGovernmentList = (schoolId: string) => {
  const [items, setItems] = useState<MultiGovernment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMultiGovernmentService(supabase);
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