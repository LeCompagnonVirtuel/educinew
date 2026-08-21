'use client';

import { useState, useCallback } from 'react';
import { EntDataClassificationService } from '../services/data-classification.service';
import { createClient } from '@/lib/supabase/client';
import type { DataClassification, DataClassificationCreate } from '@educi/types';

export const useEntDataClassificationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataClassificationCreate): Promise<DataClassification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataClassificationService(supabase);
      return await service.createDataClassification(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataClassificationCreate>): Promise<DataClassification | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataClassificationService(supabase);
      return await service.updateDataClassification(schoolId, id, data);
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
      const service = new EntDataClassificationService(supabase);
      await service.deleteDataClassification(schoolId, id);
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
