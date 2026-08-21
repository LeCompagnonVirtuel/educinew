'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentBlamelessService } from '../services/incident-blameless.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentBlameless } from '@educi/types';

export const useEntIncidentBlamelessList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentBlameless[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentBlamelessService(supabase);
      const data = await service.listIncidentBlamelesss(schoolId);
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
