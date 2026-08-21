'use client';

import { useState, useCallback } from 'react';
import { EntDataMaskingService } from '../services/data-masking.service';
import { createClient } from '@/lib/supabase/client';
import type { DataMasking, DataMaskingCreate } from '@educi/types';

export const useEntDataMaskingActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataMaskingCreate): Promise<DataMasking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataMaskingService(supabase);
      return await service.createDataMasking(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataMaskingCreate>): Promise<DataMasking | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataMaskingService(supabase);
      return await service.updateDataMasking(schoolId, id, data);
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
      const service = new EntDataMaskingService(supabase);
      await service.deleteDataMasking(schoolId, id);
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
