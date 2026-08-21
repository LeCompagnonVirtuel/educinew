'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentStatusPageService } from '../services/incident-status-page.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentStatusPage } from '@educi/types';

export const useEntIncidentStatusPageList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentStatusPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentStatusPageService(supabase);
      const data = await service.listIncidentStatusPages(schoolId);
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
