'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSAMLConfigService } from '../services/saml-config.service';
import { createClient } from '@/lib/supabase/client';
import type { SAMLConfig } from '@educi/types';

export const useEntSAMLConfigList = (schoolId: string) => {
  const [items, setItems] = useState<SAMLConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSAMLConfigService(supabase);
      const data = await service.listSAMLConfigs(schoolId);
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
