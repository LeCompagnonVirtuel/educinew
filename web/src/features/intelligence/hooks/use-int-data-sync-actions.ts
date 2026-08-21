'use client';

import { useState, useCallback } from 'react';
import { IntDataSyncService } from '../services/int-data-sync.service';
import { createClient } from '@/lib/supabase/client';
import type { IntelligenceDataSync, IntelligenceDataSyncCreate } from '@educi/types';

export const useIntDataSyncActions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: IntelligenceDataSyncCreate): Promise<IntelligenceDataSync | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDataSyncService(supabase);
      return await service.createDataSync(schoolId, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const update = useCallback(async (id: string, data: Partial<IntelligenceDataSyncCreate>): Promise<IntelligenceDataSync | null> => {
    try {
      setLoading(true);
      const supabase = createClient();
      const service = new IntDataSyncService(supabase);
      return await service.updateDataSync(schoolId, id, data);
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
      const service = new IntDataSyncService(supabase);
      await service.deleteDataSync(schoolId, id);
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