'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntDNSConfigService } from '../services/dns-config.service';
import { createClient } from '@/lib/supabase/client';
import type { DNSConfig } from '@educi/types';

export const useEntDNSConfigList = (schoolId: string) => {
  const [items, setItems] = useState<DNSConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDNSConfigService(supabase);
      const data = await service.listDNSConfigs(schoolId);
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
