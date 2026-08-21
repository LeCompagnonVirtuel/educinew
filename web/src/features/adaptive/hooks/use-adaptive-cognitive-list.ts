'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveCognitiveService } from '../services/adaptive-cognitive.service';
import { createClient } from '@/lib/supabase/client';
import type { CognitiveProfile } from '@educi/types';

export const useAdaptiveCognitiveList = (schoolId: string) => {
  const [items, setItems] = useState<CognitiveProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveCognitiveService(supabase);
      const data = await service.listCognitiveProfiles(schoolId);
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
