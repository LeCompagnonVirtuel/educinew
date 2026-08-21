'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntLDAPConfigService } from '../services/ldap-config.service';
import { createClient } from '@/lib/supabase/client';
import type { LDAPConfig } from '@educi/types';

export const useEntLDAPConfigList = (schoolId: string) => {
  const [items, setItems] = useState<LDAPConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntLDAPConfigService(supabase);
      const data = await service.listLDAPConfigs(schoolId);
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
