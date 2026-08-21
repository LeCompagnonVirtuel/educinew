'use client';

import { useState, useCallback } from 'react';
import { IntDataSourceService } from '../services/int-data-source.service';
import { createClient } from '@/lib/supabase/client';
import type { DataSource, DataSourceCreate } from '@educi/types';

export const useIntDataSourceActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataSourceCreate): Promise<DataSource | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDataSourceService(supabase);
      return await service.createDataSource(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataSourceCreate>): Promise<DataSource | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDataSourceService(supabase);
      return await service.updateDataSource(schoolId, id, data);
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
      const service = new IntDataSourceService(supabase);
      await service.deleteDataSource(schoolId, id);
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
