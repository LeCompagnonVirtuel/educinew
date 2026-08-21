'use client';

import { useState, useCallback } from 'react';
import { EntAPIChangelogService } from '../services/api-changelog.service';
import { createClient } from '@/lib/supabase/client';
import type { APIChangelog, APIChangelogCreate } from '@educi/types';

export const useEntAPIChangelogActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: APIChangelogCreate): Promise<APIChangelog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIChangelogService(supabase);
      return await service.createAPIChangelog(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<APIChangelogCreate>): Promise<APIChangelog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntAPIChangelogService(supabase);
      return await service.updateAPIChangelog(schoolId, id, data);
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
      const service = new EntAPIChangelogService(supabase);
      await service.deleteAPIChangelog(schoolId, id);
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
