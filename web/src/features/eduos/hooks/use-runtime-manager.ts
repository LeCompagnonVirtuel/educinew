'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSRuntimeManagerService } from '../services/eduos-runtime-manager.service';
import { createClient } from '@/lib/supabase/client';
import type { RuntimeManager } from '@educi/types';

export const useEduOSRuntimeManagerList = (schoolId: string) => {
  const [items, setItems] = useState<RuntimeManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSRuntimeManagerService(supabase);
      const data = await service.listRuntimeManagers(schoolId);
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
