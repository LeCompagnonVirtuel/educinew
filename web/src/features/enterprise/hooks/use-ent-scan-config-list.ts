'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntScanConfigService } from '../services/scan-config.service';
import { createClient } from '@/lib/supabase/client';
import type { ScanConfig } from '@educi/types';

export const useEntScanConfigList = (schoolId: string) => {
  const [items, setItems] = useState<ScanConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntScanConfigService(supabase);
      const data = await service.listScanConfigs(schoolId);
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
