'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveTutorService } from '../services/adaptive-tutor.service';
import { createClient } from '@/lib/supabase/client';
import type { AITutor } from '@educi/types';

export const useAdaptiveTutorList = (schoolId: string) => {
  const [items, setItems] = useState<AITutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveTutorService(supabase);
      const data = await service.listTutors(schoolId);
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
