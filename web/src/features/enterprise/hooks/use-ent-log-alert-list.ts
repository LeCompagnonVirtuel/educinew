'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLogAlertService } from '../services/log-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { LogAlert } from '@educi/types';

export const useEntLogAlertList = (schoolId: string) => {
  const [items, setItems] = useState<LogAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLogAlertService(supabase);
      const data = await service.listLogAlerts(schoolId);
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
