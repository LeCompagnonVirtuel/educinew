'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdaptiveFlashcardService } from '../services/adaptive-flashcard.service';
import { createClient } from '@/lib/supabase/client';
import type { Flashcard } from '@educi/types';

export const useAdaptiveFlashcardList = (schoolId: string) => {
  const [items, setItems] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new AdaptiveFlashcardService(supabase);
      const data = await service.listFlashcards(schoolId);
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
