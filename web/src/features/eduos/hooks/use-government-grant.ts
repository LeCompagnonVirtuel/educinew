'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSGovernmentGrantService } from '../services/eduos-government-grant.service';
import { createClient } from '@/lib/supabase/client';
import type { GovernmentGrant } from '@educi/types';

export const useEduOSGovernmentGrantList = (schoolId: string) => {
  const [items, setItems] = useState<GovernmentGrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSGovernmentGrantService(supabase);
      const data = await service.listGovernmentGrants(schoolId);
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
