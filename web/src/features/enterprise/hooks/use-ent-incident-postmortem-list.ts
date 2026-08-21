'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentPostmortemService } from '../services/incident-postmortem.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentPostmortem } from '@educi/types';

export const useEntIncidentPostmortemList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentPostmortem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentPostmortemService(supabase);
      const data = await service.listIncidentPostmortems(schoolId);
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
