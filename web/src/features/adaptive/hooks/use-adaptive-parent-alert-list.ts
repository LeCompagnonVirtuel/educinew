'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveParentAlertService } from '../services/adaptive-parent-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { ParentAlert } from '@educi/types';

export const useAdaptiveParentAlertList = (schoolId: string) => {
  const [items, setItems] = useState<ParentAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveParentAlertService(supabase);
      const data = await service.listParentAlerts(schoolId);
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
