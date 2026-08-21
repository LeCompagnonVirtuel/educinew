'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntActionService } from '../services/int-action.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceAction } from '@educi/types';

export const useIntActionList = (schoolId: string) => {
  const [items, setItems] = useState<IntelligenceAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntActionService(supabase);
      const data = await service.listActions(schoolId);
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
