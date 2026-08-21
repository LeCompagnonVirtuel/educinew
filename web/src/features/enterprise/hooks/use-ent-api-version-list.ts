'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAPIVersionService } from '../services/api-version.service';
import { createClient } from '@/lib/supabase/client';
import type { APIVersion } from '@educi/types';

export const useEntAPIVersionList = (schoolId: string) => {
  const [items, setItems] = useState<APIVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIVersionService(supabase);
      const data = await service.listAPIVersions(schoolId);
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
