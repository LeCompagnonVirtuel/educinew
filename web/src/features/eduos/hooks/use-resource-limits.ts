'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSResourceLimitsService } from '../services/eduos-resource-limits.service';
import { createClient } from '@/lib/supabase/client';
import type { ResourceLimits } from '@educi/types';

export const useEduOSResourceLimitsList = (schoolId: string) => {
  const [items, setItems] = useState<ResourceLimits[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResourceLimitsService(supabase);
      const data = await service.listResourceLimitss(schoolId);
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
