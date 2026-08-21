'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRegistrySearchQueryService } from '../services/eduos-registry-search-query.service';
import { createClient } from '@/lib/supabase/client';
import type { RegistrySearchQuery } from '@educi/types';

export const useEduOSRegistrySearchQueryList = (schoolId: string) => {
  const [items, setItems] = useState<RegistrySearchQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRegistrySearchQueryService(supabase);
      const data = await service.listRegistrySearchQuerys(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
