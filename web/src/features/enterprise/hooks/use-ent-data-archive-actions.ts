'use client';

import { useState, useCallback } from 'react';
import { EntDataArchiveService } from '../services/data-archive.service';
import { createClient } from '@/lib/supabase/client';
import type { DataArchive, DataArchiveCreate } from '@educi/types';

export const useEntDataArchiveActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataArchiveCreate): Promise<DataArchive | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataArchiveService(supabase);
      return await service.createDataArchive(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataArchiveCreate>): Promise<DataArchive | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataArchiveService(supabase);
      return await service.updateDataArchive(schoolId, id, data);
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
      const service = new EntDataArchiveService(supabase);
      await service.deleteDataArchive(schoolId, id);
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
