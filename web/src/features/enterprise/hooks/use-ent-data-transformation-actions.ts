'use client';

import { useState, useCallback } from 'react';
import { EntDataTransformationService } from '../services/data-transformation.service';
import { createClient } from '@/lib/supabase/client';
import type { DataTransformation, DataTransformationCreate } from '@educi/types';

export const useEntDataTransformationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataTransformationCreate): Promise<DataTransformation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataTransformationService(supabase);
      return await service.createDataTransformation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataTransformationCreate>): Promise<DataTransformation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataTransformationService(supabase);
      return await service.updateDataTransformation(schoolId, id, data);
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
      const service = new EntDataTransformationService(supabase);
      await service.deleteDataTransformation(schoolId, id);
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
