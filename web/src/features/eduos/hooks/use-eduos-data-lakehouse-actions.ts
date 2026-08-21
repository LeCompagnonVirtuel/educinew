'use client';

import { useState, useCallback } from 'react';
import { EduOSDataLakehouseService } from '../services/eduos-data-lakehouse.service';
import { createClient } from '@/lib/supabase/client';
import type { DataLakehouse } from '@educi/types';

export const useEduOSDataLakehouseActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataLakehouse): Promise<DataLakehouse | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataLakehouseService(supabase);
      return await service.createDataLakehouse(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataLakehouse>): Promise<DataLakehouse | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataLakehouseService(supabase);
      return await service.updateDataLakehouse(schoolId, id, data);
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
      const service = new EduOSDataLakehouseService(supabase);
      await service.deleteDataLakehouse(schoolId, id);
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