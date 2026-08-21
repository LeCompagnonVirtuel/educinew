'use client';

import { useState, useCallback } from 'react';
import { EntSearchTemplateService } from '../services/search-template.service';
import { createClient } from '@/lib/supabase/client';
import type { SearchTemplate, SearchTemplateCreate } from '@educi/types';

export const useEntSearchTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: SearchTemplateCreate): Promise<SearchTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchTemplateService(supabase);
      return await service.createSearchTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<SearchTemplateCreate>): Promise<SearchTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntSearchTemplateService(supabase);
      return await service.updateSearchTemplate(schoolId, id, data);
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
      const service = new EntSearchTemplateService(supabase);
      await service.deleteSearchTemplate(schoolId, id);
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
