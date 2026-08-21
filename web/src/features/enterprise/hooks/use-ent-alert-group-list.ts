'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertGroupService } from '../services/alert-group.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertGroup } from '@educi/types';

export const useEntAlertGroupList = (schoolId: string) => {
  const [items, setItems] = useState<AlertGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertGroupService(supabase);
      const data = await service.listAlertGroups(schoolId);
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
