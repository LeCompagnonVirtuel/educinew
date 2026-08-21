'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthAlertService } from '../services/health-alert.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthAlert } from '@educi/types';

export const useEntHealthAlertList = (schoolId: string) => {
  const [items, setItems] = useState<HealthAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthAlertService(supabase);
      const data = await service.listHealthAlerts(schoolId);
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
