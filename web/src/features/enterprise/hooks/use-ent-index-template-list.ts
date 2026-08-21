'use client';

import { useState, useEffect, useCallback } from 'react';
import { EntIndexTemplateService } from '../services/index-template.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexTemplate } from '@educi/types';

export const useEntIndexTemplateList = (schoolId: string) => {
  const [items, setItems] = useState<IndexTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexTemplateService(supabase);
      const data = await service.listIndexTemplates(schoolId);
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
