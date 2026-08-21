'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRuntimeConfigService } from '../services/eduos-runtime-config.service';
import { createClient } from '@/lib/supabase/client';
import type { RuntimeConfig } from '@educi/types';

export const useEduOSRuntimeConfigList = (schoolId: string) => {
  const [items, setItems] = useState<RuntimeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuntimeConfigService(supabase);
      const data = await service.listRuntimeConfigs(schoolId);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refresh: fetchItems };
};
