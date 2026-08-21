'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntResourceManagerService } from '../services/resource-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { ResourceManager } from '@educi/types';

export const useEntResourceManagerList = (schoolId: string) => {
  const [items, setItems] = useState<ResourceManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntResourceManagerService(supabase);
      const data = await service.listResourceManagers(schoolId);
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
