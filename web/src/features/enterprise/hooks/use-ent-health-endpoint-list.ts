'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntHealthEndpointService } from '../services/health-endpoint.service';
import { createClient } from '@/lib/supabase/client';
import type { HealthEndpoint } from '@educi/types';

export const useEntHealthEndpointList = (schoolId: string) => {
  const [items, setItems] = useState<HealthEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntHealthEndpointService(supabase);
      const data = await service.listHealthEndpoints(schoolId);
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
