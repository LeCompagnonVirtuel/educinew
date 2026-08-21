'use client';

import { useState, useCallback } from 'react';
import { EduOSDataCatalogService } from '../services/eduos-data-catalog.service';
import { createClient } from '@/lib/supabase/client';
import type { DataCatalog } from '@educi/types';

export const useEduOSDataCatalogActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataCatalog): Promise<DataCatalog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataCatalogService(supabase);
      return await service.createDataCatalog(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataCatalog>): Promise<DataCatalog | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataCatalogService(supabase);
      return await service.updateDataCatalog(schoolId, id, data);
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
      const service = new EduOSDataCatalogService(supabase);
      await service.deleteDataCatalog(schoolId, id);
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