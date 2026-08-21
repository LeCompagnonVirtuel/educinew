'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIncidentResolutionService } from '../services/incident-resolution.service';
import { createClient } from '@/lib/supabase/client';
import type { IncidentResolution } from '@educi/types';

export const useEntIncidentResolutionList = (schoolId: string) => {
  const [items, setItems] = useState<IncidentResolution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIncidentResolutionService(supabase);
      const data = await service.listIncidentResolutions(schoolId);
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
