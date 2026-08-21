'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSOAuthConfigurationService } from '../services/eduos-oauth-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { OAuthConfiguration } from '@educi/types';

export const useEduOSOAuthConfigurationList = (schoolId: string) => {
  const [items, setItems] = useState<OAuthConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSOAuthConfigurationService(supabase);
      const data = await service.listOAuthConfigurations(schoolId);
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
