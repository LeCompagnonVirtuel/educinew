'use client';

import { useState, useCallback } from 'react';
import { EntDataValidationService } from '../services/data-validation.service';
import { createClient } from '@/lib/supabase/client';
import type { DataValidation, DataValidationCreate } from '@educi/types';

export const useEntDataValidationActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataValidationCreate): Promise<DataValidation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataValidationService(supabase);
      return await service.createDataValidation(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataValidationCreate>): Promise<DataValidation | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataValidationService(supabase);
      return await service.updateDataValidation(schoolId, id, data);
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
      const service = new EntDataValidationService(supabase);
      await service.deleteDataValidation(schoolId, id);
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
