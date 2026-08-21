'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntFailoverZoneService } from '../services/failover-zone.service';
import { createClient } from '@/lib/supabase/client';
import type { FailoverZone } from '@educi/types';

export const useEntFailoverZoneList = (schoolId: string) => {
  const [items, setItems] = useState<FailoverZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntFailoverZoneService(supabase);
      const data = await service.listFailoverZones(schoolId);
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
