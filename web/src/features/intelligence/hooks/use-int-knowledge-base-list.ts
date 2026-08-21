'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntKnowledgeBaseService } from '../services/int-knowledge-base.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeBaseArticle } from '@educi/types';

export const useIntKnowledgeBaseList = (schoolId: string) => {
  const [items, setItems] = useState<KnowledgeBaseArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKnowledgeBaseService(supabase);
      const data = await service.listKnowledgeBaseArticles(schoolId);
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