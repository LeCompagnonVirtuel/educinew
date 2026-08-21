'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSTenantRuntimeService } from '../services/eduos-tenant-runtime.service';
import { createClient } from '@/lib/supabase/client';
import type { TenantRuntime } from '@educi/types';

export const useEduOSTenantRuntimeList = (schoolId: string) => {
  const [items, setItems] = useState<TenantRuntime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSTenantRuntimeService(supabase);
      const data = await service.listTenantRuntimes(schoolId);
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
