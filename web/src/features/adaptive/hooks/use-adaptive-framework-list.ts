'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveFrameworkService } from '../services/adaptive-framework.service';
import { createClient } from '@/lib/supabase/client';
import type { CompetencyFramework } from '@educi/types';

export const useAdaptiveFrameworkList = (schoolId: string) => {
  const [items, setItems] = useState<CompetencyFramework[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveFrameworkService(supabase);
      const data = await service.listFrameworks(schoolId);
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
