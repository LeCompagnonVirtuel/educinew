'use client';

import { useState, useCallback } from 'react';
import { EduOSDataLineageService } from '../services/eduos-data-lineage.service';
import { createClient } from '@/lib/supabase/client';
import type { DataLineage } from '@educi/types';

export const useEduOSDataLineageActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: DataLineage): Promise<DataLineage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataLineageService(supabase);
      return await service.createDataLineage(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<DataLineage>): Promise<DataLineage | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new EduOSDataLineageService(supabase);
      return await service.updateDataLineage(schoolId, id, data);
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
      const service = new EduOSDataLineageService(supabase);
      await service.deleteDataLineage(schoolId, id);
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