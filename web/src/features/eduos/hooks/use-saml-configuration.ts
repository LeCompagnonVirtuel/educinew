'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSSAMLConfigurationService } from '../services/eduos-saml-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { SAMLConfiguration } from '@educi/types';

export const useEduOSSAMLConfigurationList = (schoolId: string) => {
  const [items, setItems] = useState<SAMLConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSSAMLConfigurationService(supabase);
      const data = await service.listSAMLConfigurations(schoolId);
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
