'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSFeatureRegistryService } from '../services/eduos-feature-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { FeatureRegistry } from '@educi/types';

export const useEduOSFeatureRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<FeatureRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSFeatureRegistryService(supabase);
      const data = await service.listFeatureRegistrys(schoolId);
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
