'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentTimelineService } from '../services/incident-timeline.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentTimeline } from '@educi/types';

export const useEntIncidentTimelineList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentTimeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentTimelineService(supabase);
      const data = await service.listIncidentTimelines(schoolId);
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
