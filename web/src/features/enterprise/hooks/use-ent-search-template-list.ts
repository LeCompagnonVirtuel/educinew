'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntSearchTemplateService } from '../services/search-template.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchTemplate } from '@educi/types';

export const useEntSearchTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<SearchTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchTemplateService(supabase);
      const data = await service.listSearchTemplates(schoolId);
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
