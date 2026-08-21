'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntGlobalAdministrationService } from '../services/global-administration.service';
import { createClient } from '@/lib/supabase/client';
import type { GlobalAdministration } from '@educi/types';

export const useEntGlobalAdministrationList = (schoolId: string) => {
  const [items, setItems] = useState<GlobalAdministration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntGlobalAdministrationService(supabase);
      const data = await service.listGlobalAdministrations(schoolId);
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
