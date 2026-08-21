'use client';

import { useState, useCallback } from 'react';
import { EntDataExportService } from '../services/data-export.service';
import { createClient } from '@/lib/supabase/client';
import type { DataExport, DataExportCreate } from '@educi/types';

export const useEntDataExportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataExportCreate): Promise<DataExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataExportService(supabase);
      return await service.createDataExport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataExportCreate>): Promise<DataExport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataExportService(supabase);
      return await service.updateDataExport(schoolId, id, data);
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
      const service = new EntDataExportService(supabase);
      await service.deleteDataExport(schoolId, id);
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
