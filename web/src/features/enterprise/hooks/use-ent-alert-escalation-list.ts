'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertEscalationService } from '../services/alert-escalation.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertEscalation } from '@educi/types';

export const useEntAlertEscalationList = (schoolId: string) => {
  const [items, setItems] = useState<AlertEscalation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertEscalationService(supabase);
      const data = await service.listAlertEscalations(schoolId);
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
