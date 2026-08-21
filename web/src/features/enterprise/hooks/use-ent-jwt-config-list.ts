'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntJWTConfigService } from '../services/jwt-config.service';
import { createClient } from '@/lib/supabase/client';
import type { JWTConfig } from '@educi/types';

export const useEntJWTConfigList = (schoolId: string) => {
  const [items, setItems] = useState<JWTConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntJWTConfigService(supabase);
      const data = await service.listJWTConfigs(schoolId);
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
