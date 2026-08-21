'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntAlertIncidentService } from '../services/alert-incident.service';
import { createClient } from '@/lib/supabase/client';
import type { AlertIncident } from '@educi/types';

export const useEntAlertIncidentList = (schoolId: string) => {
  const [items, setItems] = useState<AlertIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAlertIncidentService(supabase);
      const data = await service.listAlertIncidents(schoolId);
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
