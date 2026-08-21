'use client';

import { useState, useCallback } from 'react';
import { EntDataImportService } from '../services/data-import.service';
import { createClient } from '@/lib/supabase/client';
import type { DataImport, DataImportCreate } from '@educi/types';

export const useEntDataImportActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataImportCreate): Promise<DataImport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataImportService(supabase);
      return await service.createDataImport(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataImportCreate>): Promise<DataImport | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataImportService(supabase);
      return await service.updateDataImport(schoolId, id, data);
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
      const service = new EntDataImportService(supabase);
      await service.deleteDataImport(schoolId, id);
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
