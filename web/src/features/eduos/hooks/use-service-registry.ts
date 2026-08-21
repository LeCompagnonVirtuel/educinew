'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSServiceRegistryService } from '../services/eduos-service-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ServiceRegistry } from '@educi/types';

export const useEduOSServiceRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<ServiceRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSServiceRegistryService(supabase);
      const data = await service.listServiceRegistrys(schoolId);
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
