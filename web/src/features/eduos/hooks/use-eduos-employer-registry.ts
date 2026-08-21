'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSEmployerRegistryService } from '../services/eduos-employer-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { EmployerRegistry } from '@educi/types';

export const useEduOSEmployerRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<EmployerRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSEmployerRegistryService(supabase);
      const data = await service.listEmployerRegistrys(schoolId);
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
