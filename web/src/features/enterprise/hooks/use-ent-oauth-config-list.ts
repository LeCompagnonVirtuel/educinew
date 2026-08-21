'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntOAuthConfigService } from '../services/oauth-config.service';
import { createClient } from '@/lib/supabase/client';
import type { OAuthConfig } from '@educi/types';

export const useEntOAuthConfigList = (schoolId: string) => {
  const [items, setItems] = useState<OAuthConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntOAuthConfigService(supabase);
      const data = await service.listOAuthConfigs(schoolId);
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
