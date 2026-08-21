'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSModuleRegistryService } from '../services/eduos-module-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ModuleRegistry } from '@educi/types';

export const useEduOSModuleRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<ModuleRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSModuleRegistryService(supabase);
      const data = await service.listModuleRegistrys(schoolId);
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
