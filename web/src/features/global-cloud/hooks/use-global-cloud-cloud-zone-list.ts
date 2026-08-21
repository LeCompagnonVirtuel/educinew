'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudCloudZoneService } from '../services/global-cloud-cloud-zone.service';
import { createClient } from '@/lib/supabase/client';
import type { CloudZone } from '@educi/types';

export const useGlobalCloudCloudZoneList = (schoolId: string) => {
  const [items, setItems] = useState<CloudZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudCloudZoneService(supabase);
      const data = await service.list(schoolId);
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