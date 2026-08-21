'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMultiMinistryService } from '../services/global-cloud-multi-ministry.service';
import { createClient } from '@/lib/supabase/client';
import type { MultiMinistry } from '@educi/types';

export const useGlobalCloudMultiMinistryList = (schoolId: string) => {
  const [items, setItems] = useState<MultiMinistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMultiMinistryService(supabase);
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