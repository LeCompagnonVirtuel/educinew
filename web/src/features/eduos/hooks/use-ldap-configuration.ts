'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSLDAPConfigurationService } from '../services/eduos-ldap-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { LDAPConfiguration } from '@educi/types';

export const useEduOSLDAPConfigurationList = (schoolId: string) => {
  const [items, setItems] = useState<LDAPConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSLDAPConfigurationService(supabase);
      const data = await service.listLDAPConfigurations(schoolId);
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
