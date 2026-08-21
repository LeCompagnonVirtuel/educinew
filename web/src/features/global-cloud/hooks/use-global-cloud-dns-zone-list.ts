'use client';

import { useState, useEffect, useCallback } from 'react';
import { GlobalCloudDNSZoneService } from '../services/global-cloud-dns-zone.service';
import { createClient } from '@/lib/supabase/client';
import type { DNSZone } from '@educi/types';

export const useGlobalCloudDNSZoneList = (schoolId: string) => {
  const [items, setItems] = useState<DNSZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new GlobalCloudDNSZoneService(supabase);
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