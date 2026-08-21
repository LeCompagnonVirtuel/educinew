'use client';

import { useState, useEffect, useCallback } from 'react';
import { EduOSResearchRegistryService } from '../services/eduos-research-registry.service';
import { createClient } from '@/lib/supabase/client';
import type { ResearchRegistry } from '@educi/types';

export const useEduOSResearchRegistryList = (schoolId: string) => {
  const [items, setItems] = useState<ResearchRegistry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSResearchRegistryService(supabase);
      const data = await service.listResearchRegistrys(schoolId);
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
