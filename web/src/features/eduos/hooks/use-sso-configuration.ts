'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSSOConfigurationService } from '../services/eduos-sso-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { SSOConfiguration } from '@educi/types';

export const useEduOSSSOConfigurationList = (schoolId: string) => {
  const [items, setItems] = useState<SSOConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSSOConfigurationService(supabase);
      const data = await service.listSSOConfigurations(schoolId);
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
