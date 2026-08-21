'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchPhoneticService } from '../services/search-phonetic.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchPhonetic } from '@educi/types';

export const useEntSearchPhoneticList = (schoolId: string) => {
  const [items, setItems] = useState<SearchPhonetic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchPhoneticService(supabase);
      const data = await service.listSearchPhonetics(schoolId);
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
