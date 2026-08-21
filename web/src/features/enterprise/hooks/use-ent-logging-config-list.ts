'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLoggingConfigService } from '../services/logging-config.service';
import { createClient } from '@/lib/supabase/client';
import type { LoggingConfig } from '@educi/types';

export const useEntLoggingConfigList = (schoolId: string) => {
  const [items, setItems] = useState<LoggingConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLoggingConfigService(supabase);
      const data = await service.listLoggingConfigs(schoolId);
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
