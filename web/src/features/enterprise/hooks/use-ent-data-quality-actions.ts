'use client';

import { useState, useCallback } from 'react';
import { EntDataQualityService } from '../services/data-quality.service';
import { createClient } from '@/lib/supabase/client';
import type { DataQuality, DataQualityCreate } from '@educi/types';

export const useEntDataQualityActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataQualityCreate): Promise<DataQuality | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataQualityService(supabase);
      return await service.createDataQuality(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataQualityCreate>): Promise<DataQuality | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EntDataQualityService(supabase);
      return await service.updateDataQuality(schoolId, id, data);
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
      const service = new EntDataQualityService(supabase);
      await service.deleteDataQuality(schoolId, id);
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
