'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSELTConfigurationService } from '../services/eduos-elt-configuration.service';
import { createClient } from '@/lib/supabase/client';
import type { ELTConfiguration } from '@educi/types';

export const useEduOSELTConfigurationList = (schoolId: string) => {
  const [items, setItems] = useState<ELTConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSELTConfigurationService(supabase);
      const data = await service.listELTConfigurations(schoolId);
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