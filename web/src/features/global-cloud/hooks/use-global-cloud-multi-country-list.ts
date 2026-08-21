'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudMultiCountryService } from '../services/global-cloud-multi-country.service';
import { createClient } from '@/lib/supabase/client';
import type { MultiCountry } from '@educi/types';

export const useGlobalCloudMultiCountryList = (schoolId: string) => {
  const [items, setItems] = useState<MultiCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudMultiCountryService(supabase);
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