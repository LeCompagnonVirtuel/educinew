'use client';

import { useState, useCallback } from 'react';
import { IntKnowledgeBaseService } from '../services/int-knowledge-base.service';
import { createClient } from '@/lib/supabase/client';
import type { KnowledgeBaseArticle, KnowledgeBaseArticleCreate } from '@educi/types';

export const useIntKnowledgeBaseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: KnowledgeBaseArticleCreate): Promise<KnowledgeBaseArticle | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKnowledgeBaseService(supabase);
      return await service.createKnowledgeBaseArticle(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<KnowledgeBaseArticleCreate>): Promise<KnowledgeBaseArticle | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKnowledgeBaseService(supabase);
      return await service.updateKnowledgeBaseArticle(schoolId, id, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const remove = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntKnowledgeBaseService(supabase);
      await service.deleteKnowledgeBaseArticle(schoolId, id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, create, update, remove };
};