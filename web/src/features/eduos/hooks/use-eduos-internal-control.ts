'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSInternalControlService } from '../services/eduos-internal-control.service';
import { createClient } from '@/lib/supabase/client';
import type { InternalControl } from '@educi/types';

export const useEduOSInternalControlList = (schoolId: string) => {
  const [items, setItems] = useState<InternalControl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSInternalControlService(supabase);
      const data = await service.listInternalControls(schoolId);
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
