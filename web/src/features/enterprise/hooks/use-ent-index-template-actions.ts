'use client';

import { useState, useCallback } from 'react';
import { EntIndexTemplateService } from '../services/index-template.service';
import { createClient } from '@/lib/supabase/client';
import type { IndexTemplate, IndexTemplateCreate } from '@educi/types';

export const useEntIndexTemplateActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IndexTemplateCreate): Promise<IndexTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexTemplateService(supabase);
      return await service.createIndexTemplate(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IndexTemplateCreate>): Promise<IndexTemplate | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntIndexTemplateService(supabase);
      return await service.updateIndexTemplate(schoolId, id, data);
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
      const service = new EntIndexTemplateService(supabase);
      await service.deleteIndexTemplate(schoolId, id);
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
